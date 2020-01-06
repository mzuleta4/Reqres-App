import React, {useEffect, useState} from 'react';
import Select from "react-select";
import {Button} from "reactstrap";
import history from "../../Util/History";
import {toast} from "../../Util/Utils";
import {deleteResource, updateResource} from "../../Services";

interface props {
    resourceList: Array<any>
}

const ViewResourceComponent = ({resourceList}: props) => {

    const options = [{value: "update", label: "Update resource"}
        , {value: "delete", label: "Delete resource"}];

    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptionResource, setSelectedOptionResource] = useState(null);
    const [optionsResource, setOptionsResource] = useState<Array<any>>([]);
    const [resourceId, setResourceId] = useState(0);
    const [name, setName] = useState('');
    const [label, setLabel] = useState("");

    const handleChange = (option: any) => {
        setSelectedOption(option);
        setLabel(option.label);
    };

    const handleChangeSelectResource = (option: any) => {
        setSelectedOptionResource(option);
        setResourceId(option.value);

    };

    const processLaunch = async (id?: number) => {
        if (name.length === 0) {
            toast("Complete field name.", "error")
        } else {
            if (label === "Update resource") {
                const res = await updateResource({name: name}, id);
                console.log(res);
                toast(`Resource ${name} update succesfully!`, "success");
                history.push("/list");
            } else {

                const res = await deleteResource(id);
                console.log(res);
                toast(`Resource ${name} deleted succesfully!`, "success");
                history.push("/list");
            }
        }
    };

    useEffect(() => {
        resourceList.map((resource: any) => {
            return setOptionsResource(optionsResource => [...optionsResource, {
                value: resource.id,
                label: `${resource.id} ${resource.name}`
            }])
        });

        if (performance.navigation.type === 1) {
            history.push("/list");
        }
    }, [resourceList]);



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

            {(label === "Update resource" || label === "Delete resource") &&
                <div className="col-10 col-md-6 col-lg-4">
                    <div className="card shadow" style={{borderRadius: "10px"}}>
                        <div className="card-body">
                            <h5 className="card-title">{label}</h5>
                            {
                                (label === "Update resource" || label === "Delete resource") ?
                                    <Select
                                        value={selectedOptionResource}
                                        onChange={handleChangeSelectResource}
                                        options={optionsResource}/> : ""
                            }
                            <div className="form-group row pt-3 m-2">
                                <label htmlFor="inputName">Name</label>
                                <input type="text" className="form-control" onChange={e => setName(e.target.value)}
                                       value={(label === "Update resource" || label === "Delete resource") ?
                                           name : name
                                       } id="inputName"/>
                            </div>

                            <div className="text-center">
                                <Button color="info" onClick={() => processLaunch(resourceId)}
                                        className="btn-sm">{label}</Button>{' '}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>
};

export default ViewResourceComponent;