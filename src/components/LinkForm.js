import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { toast } from 'react-toastify';

export const LinkForm = (props) => {
    const initialStateUser = {
        url: '',
        name: '',
        description: ''
    }

    const [user, setUser] = useState(initialStateUser);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // console.log(name,value)
        setUser({ ...user, [name]: value })

    }

    const validUrl = str => {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(str);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validUrl(user.url)) {
            toast('wrong URL X(', {
                type: 'error',
                autoclose: 2000
            });
        } else {
            props.addOrEdit(user);
            setUser({ ...initialStateUser })
        }
    }

    const getLinkbyId = async (id) => {
        try {
            const doc = await db.collection('links').doc(id).get();
            setUser({ ...doc.data() });
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (props.currentId === "") {
            setUser({ ...initialStateUser })
        } else {
            getLinkbyId(props.currentId);
        }
    }, [props.currentId])



    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-link" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                        <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
                    </svg>
                </div>
                <input type="text"
                    className="form-control"
                    placeholder="https://someurl.com"
                    name="url"
                    onChange={e => handleInputChange(e)}
                    value={user.url} />
            </div>
            <div className="form-group input-group">
                <div className="input-group-text">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pen" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                    </svg>
                </div>
                <input type="text"
                    className="form-control"
                    placeholder="Website name..."
                    name="name"
                    onChange={e => handleInputChange(e)}
                    value={user.name} />
            </div>
            <div className="form-group input-group">
                <textarea type="text"
                    className="form-control"
                    rows="3"
                    placeholder="Description..."
                    name="description"
                    onChange={e => handleInputChange(e)}
                    value={user.description}
                />
            </div>
            <button className="btn btn-primary btn-block">
                {props.currentId === "" ? 'Save' : 'Update'}
            </button>
        </form>

    )
}

