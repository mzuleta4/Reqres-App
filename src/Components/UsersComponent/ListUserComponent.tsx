import React, {useState} from 'react';
import PaginationComponent from "../Shared/PaginationComponent";
import {Spinner} from "reactstrap";
import ModalComponent from "../Shared/ModalComponent";
import {find, toast} from "../../Util/Utils";

const ListUserComponent = ({loading, pageItems, totalItems, handlePage}: any) => {

    const pageSize = 5;
    const toggleModal = () => setModal(!modal);
    const [id, setId] = useState(0);
    const [modal, setModal] = useState(false);

    const setToggle = (id: number) => {
        toggleModal();
        setId(id);
    };

    const changeHandlerFile = ((e: any) => {
        toast(`Image ${e.target.files[0].name} uploaded!`, "success");
    });


    return <div>
        {!loading ?
            <div>
                <h2>List Users</h2>
                <div className="card p-2">
                    <div className="row justify-content-center m-0">
                        {pageItems.map((user: any) => (
                            <div className="card col-8 col-md-2 mt-5 ml-4 p-0" key={user.id}>
                                <img src={user.avatar} className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">{`${user.first_name} ${user.last_name}`}</h5>
                                    <p className="card-text">{user.email}</p>
                                    <a className="btn btn-primary" onClick={() => setToggle(user.id)} href="#/list"
                                       role="button">View
                                        User</a>
                                </div>
                            </div>
                        ))}
                    </div>
                    <PaginationComponent totalItems={totalItems}
                                         pageSize={pageSize}
                                         changePage={handlePage}/>
                </div>
            </div> : <Spinner color="primary"/>
        }
        {modal && <ModalComponent header="View User" body={
            <div className="text-center">
                <div>
                    <label htmlFor="file-input">
                        <img src={find(id, pageItems).avatar} style={{cursor: "pointer"}} className="card-img-top"
                             alt="avatar"/>
                    </label>
                    <input className="d-none" id="file-input" type="file" onChange={changeHandlerFile}/>
                </div>
                <div className="card-body">
                    <p className="card-text"><strong>First Name:</strong> {find(id, pageItems).first_name}</p>
                    <p className="card-text"><strong>Last Name:</strong> {find(id, pageItems).last_name}</p>
                    <p className="card-text"><strong>Email:</strong> {find(id, pageItems).email}</p>
                </div>
            </div>
        } onClose={toggleModal} size="2" footer={
            <button className="btn btn-primary" onClick={toggleModal}>Salir</button>
        }/>}
    </div>;

};

export default ListUserComponent;
