import React, {useState} from 'react';
import PaginationComponent from "../Shared/PaginationComponent";
import {Spinner} from "reactstrap";
import ModalComponent from "../Shared/ModalComponent";
import {find} from "../../Util/Utils";


const ResourceComponent = ({loading, pageItems, totalItems, handlePage}: any) => {

    const pageSize = 5;
    const toggleModal = () => setModal(!modal);
    const [id, setId] = useState(0);
    const [modal, setModal] = useState(false);

    const setToggle = (id: number) => {
        toggleModal();
        setId(id);
    };

    return <div>
        {!loading ?
            <div>
                <h2 className="custom-title">List Resources</h2>
                <div className="card p-2">
                    <div className="row justify-content-center m-0">
                        {pageItems.map((resource: any) => (
                            <div className="card col-8 col-md-2 mt-5 ml-4 p-0" key={resource.id}>
                                <div className="card-body">
                                    <h5 className="card-title">{resource.name}</h5>
                                    <p className="card-text">{resource.year}</p>
                                    <p className="card-text" style={{color: resource.color}}>{resource.color}</p>
                                    <p className="card-text">{resource.pantone_value}</p>
                                    <a className="btn btn-primary custom-button-login" onClick={() => setToggle(resource.id)} href="#/list"
                                       role="button">View </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    <PaginationComponent totalItems={totalItems}
                                         pageSize={pageSize}
                                         changePage={handlePage}/>
                </div>
            </div>
            : <Spinner color="primary"/>

        }
        {modal && <ModalComponent header="View Resource" body={
            <div className="text-center">
                <div className="card-body">
                    <h5 className="card-title custom-title"><strong>{find(id, pageItems).name}</strong></h5>
                    <p className="card-text"><strong>Year: </strong>{find(id, pageItems).year}</p>
                    <p className="card-text" style={{color: find(id, pageItems).color}}>
                        <strong>Color: </strong>{find(id, pageItems).color}</p>
                    <p className="card-text"><strong>Pantone Value: </strong>{find(id, pageItems).pantone_value}</p>
                </div>
            </div>
        } onClose={toggleModal} size="2" footer={
            <button className="btn btn-primary custom-button-login" onClick={toggleModal}>Salir</button>
        }/>}
    </div>;

};

export default ResourceComponent;
