import React, {useState, useEffect} from "react";
import {PaginationItem, Pagination, PaginationLink} from 'reactstrap';

const PaginationComponent = ({totalItems, pageSize, changePage}) => {
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        setCurrentPage(0);
    }, [totalItems]);

    function handleClick(e, index) {
        e.preventDefault();
        changePage(index);
        setCurrentPage(index);
    }

    return (
        <div className="text-center pt-3" style={{marginTop: '10px', margin: 'auto', width: 'max-content'}}>
            <Pagination aria-label="Page navigation">
                <PaginationItem disabled={currentPage <= 0}>
                    <PaginationLink onClick={e => handleClick(e, currentPage - 1)} previous href="#"/>
                </PaginationItem>
                {[...Array(Math.ceil(totalItems / pageSize))].map((page, i) => {
                        return ((i > currentPage - 3 && i < currentPage + 3 && currentPage >= 3) || (i < 5 && currentPage < 3)) ?
                            <PaginationItem active={i === currentPage} key={i}>
                                <PaginationLink onClick={e => handleClick(e, i)} href="#">{i + 1}</PaginationLink>
                            </PaginationItem> : null
                    }
                )}
                <PaginationItem disabled={currentPage >= (totalItems / pageSize - 1)}>
                    <PaginationLink onClick={e => handleClick(e, currentPage + 1)} next href="#"/>
                </PaginationItem>
            </Pagination>
        </div>
    );
};

export default PaginationComponent;
