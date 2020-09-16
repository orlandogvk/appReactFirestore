import React, { useEffect, useState } from 'react';
import { LinkForm } from './LinkForm';

import { db } from '../firebase';
import { toast } from 'react-toastify';


export const Links = () => {

    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState("");

    const addOrEdit = async (linkObject) => {
        try {
            if (currentId === "") {
                await db.collection('links').doc().set(linkObject);
                toast("New link added", {
                    type: 'success',
                    autoclose: 2000
                });
            } else {
                await db.collection('links').doc(currentId).update(linkObject);
                toast("Link updated succesfull", {
                    type: 'info',
                    autoclose: 2000
                });
                setCurrentId("");
            }
        } catch (err) {
            console.error(err);
        }
    }

    const onDeleteLink = async (id) => {
        try {
            // console.log('id',id)
            if (window.confirm('Are you sure you want to delete this link?')) {
                await db.collection('links').doc(id).delete();
                toast('task deleted', {
                    type: 'error',
                    autoclose: 2000
                });
            }
        } catch (err) {
            console.error(err);
        }
    }

    const getLinks = async () => {
        try {
            db.collection('links').onSnapshot((querySnapshot) => {
                const docs = [];
                querySnapshot.forEach(doc => {
                    docs.push({ ...doc.data(), id: doc.id })
                });
                setLinks(docs);
            });
        } catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
        getLinks();
    }, []);

    return (
        <>
            <div className="col-md-4 p-2">
                <LinkForm {...{ addOrEdit, currentId, links }} />
            </div>

            <div className="col-md-8 p-2">
                {links.map((link) => (
                    <div className="card mb-1" key={link.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4>{link.name}</h4>
                                <div>
                                    <svg onClick={() => onDeleteLink(link.id)} width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-door-closed-fill" fill="red" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M4 1a1 1 0 0 0-1 1v13H1.5a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2a1 1 0 0 0-1-1H4zm2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                    </svg>
                                    <svg onClick={() => setCurrentId(link.id)} width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="yellow" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                </div>

                            </div>
                            <p>{link.description}</p>
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                                Go to Website
                        </a>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}