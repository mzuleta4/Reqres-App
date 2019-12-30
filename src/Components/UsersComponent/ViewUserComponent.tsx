import React, {useEffect, useState} from 'react';
import Select from "react-select";
import {Button} from "reactstrap";
import history from "../../Util/History";
import {find, toast} from "../../Util/Utils";
import {createUser, deleteUser, updateUser} from "../../Services";

interface props {
    userList: Array<any>
}

const ViewUserComponent = ({userList}: props) => {

    const options = [{value: "create", label: "Create user"}, {value: "update", label: "Update user"}
        , {value: "delete", label: "Delete user"}];

    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptionUser, setSelectedOptionUser] = useState(null);
    const [optionsUser, setOptionsUser] = useState<Array<any>>([]);
    const [userId, setUserId] = useState(0);
    const [name, setName] = useState('');
    const [job, setJob] = useState('');
    const [label, setLabel] = useState("");

    const handleChange = (option: any) => {
        setSelectedOption(option);
        setLabel(option.label);
    };

    const handleChangeSelectUser = (option: any) => {
        setSelectedOptionUser(option);
        setUserId(option.value);
        setName(`${find(option.value, userList).first_name} ${find(option.value, userList).last_name}`);
    };

    const processLaunch = async (id?: number) => {
        if (name.length === 0) {
            toast("Complete field name.", "error")
        } else {
            if (label === "Create user") {
                if (name.split(" ").length === 2) {
                    if (job.length === 0) {
                        toast("Complete field job.", "error");
                    } else {
                        const res = await createUser({name: name, job: job});
                        console.log(res);
                        toast(`User ${name} created succesfully!`, "success");
                        history.push("/list");
                    }
                } else {
                    toast("First name and last name required.<br/>Only two words.", "error")
                }
            } else if (label === "Update user") {
                if (job.length === 0) {
                    toast("Complete field job.", "error");
                } else {
                    const res = await updateUser({name: name, job: job}, id);
                    console.log(res);
                    toast(`User ${name} update succesfully!`, "success");
                    history.push("/list");
                }
            } else {
                const res = await deleteUser(id);
                console.log(res);
                toast(`User ${name} deleted succesfully!`, "success");
                history.push("/list");
            }
        }
    };

    useEffect(() => {
        userList.map((user: any) => {
            return setOptionsUser(optionsUser => [...optionsUser, {value: user.id, label: `${user.id} ${user.first_name}`}])
        });

        if (performance.navigation.type === 1) {
            history.push("/list");
        }
    }, [userList]);

    return <div>
        <div className="row mt-5 m-0 justify-content-center">
            <div className="col-10 col-md-6 col-lg-4">
                <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={options}/>
            </div>
        </div>

        <div className="row mt-5 m-0 justify-content-center">

            {selectedOption &&
            <div className="col-10 col-md-6 col-lg-4">
                <div className="card shadow" style={{borderRadius: "10px"}}>
                    <div className="card-body">
                        <h5 className="card-title">{label}</h5>
                        {
                            (label === "Update user" || label === "Delete user") ?
                                <Select
                                    value={selectedOptionUser}
                                    onChange={handleChangeSelectUser}
                                    options={optionsUser}/> : ""
                        }
                        <div className="form-group row pt-3 m-2">
                            <label htmlFor="inputName">Name</label>
                            <input type="text" className="form-control" onChange={e => setName(e.target.value)}
                                   value={(label === "Update user" || label === "Delete user") ?
                                       name : name
                                   } id="inputName"/>
                        </div>

                        <div className="form-group row pt-3 m-2">
                            <label htmlFor="inputJob">Job</label>
                            <input type="text" className="form-control" onChange={e => setJob(e.target.value)}
                                   id="inputJob"/>
                        </div>
                        <div className="text-center">
                            <Button color="info" onClick={() => processLaunch(userId)}
                                    className="btn-sm">{label}</Button>{' '}
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    </div>
};

export default ViewUserComponent;