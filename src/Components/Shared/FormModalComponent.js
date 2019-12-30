import React, {useState} from 'react';
import {Button} from "reactstrap";

const FormModalComponent = () => {
    const [name, setName] = useState('');
    const [job, setJob] = useState('');



    return <div>
        <div className="form-group row pt-3 m-2">
            <label htmlFor="inputName">Name</label>
            <input type="text" className="form-control" onChange={e => setName(e.target.value)}
                   value={name} id="inputName"/>
        </div>

        <div className="form-group row pt-3 m-2">
            <label htmlFor="inputJob">Job</label>
            <input type="text" className="form-control" onChange={e => setJob(e.target.value)}
                   value={job} id="inputJob"/>
        </div>
        <div className="text-center">
            <Button color="success" outline className="btn-sm" onClick={() => processLaunch()}>Create
                User</Button>{' '}
        </div>
    </div>
};

export default FormModalComponent;