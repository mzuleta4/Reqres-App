import React, {useEffect, useState} from 'react';
import NavComponent from "../Shared/NavComponent";
import {HashRouter as Router, Switch, Route} from "react-router-dom";
import ListUserComponent from "../UsersComponent/ListUserComponent";
import {getListResource, getListUsers} from "../../Services";
import {sliceObjects} from "../../Util/Utils";
import ViewUserComponent from "../UsersComponent/ViewUserComponent";
import ResourceComponent from "../ResourceComponent/ResourceComponent";
import ViewResourceComponent from "../ResourceComponent/ViewResourceComponent";
import StatiticsComponent from "../ResourceComponent/StatisticsComponent";

const MainComponent = () => {

    const pageSize = 5;
    const [loading, setLoading] = useState(false);
    const [initialUserList, setInitialUserList] = useState<Array<any>>([]);
    const [filterUserList, setFilterUserList] = useState<Array<any>>([]);
    const [pageItemsUser, setPageItemsUser] = useState<Array<any>>([]);
    const [initialResourceList, setInitialResourceList] = useState<Array<any>>([]);
    const [filterResourceList, setFilterResourceList] = useState<Array<any>>([]);
    const [pageItemsResource, setPageItemsResource] = useState<Array<any>>([]);

    const handleChangePageUser = (currentPage: number, itemsPage: Array<any> = []) => {
        itemsPage = filterUserList.length ? filterUserList : itemsPage;
        const newArray = sliceObjects(itemsPage, pageSize, currentPage);
        setPageItemsUser(newArray);
    };

    const handleChangePageResource = (currentPage: number, itemsPage: Array<any> = []) => {
        itemsPage = filterResourceList.length ? filterResourceList : itemsPage;
        const newArray = sliceObjects(itemsPage, pageSize, currentPage);
        setPageItemsResource(newArray);
    };

    useEffect(() =>{
        const getUsers = async () => {

            setLoading(true);
            const res = await getListUsers(1);
            if (res && res.data.length > 0) {
                setLoading(false);
                setInitialUserList(res.data);
                setFilterUserList(res.data);
                const itemsOrder = res.data.sort((a: any, b: any) => b.id - a.id);
                handleChangePageUser(0, itemsOrder)
            }
        };
        const getResource = async () => {
            setLoading(true);
            const res = await getListResource();
            if (res && res.data.length > 0) {
                setLoading(false);
                setInitialResourceList(res.data);
                setFilterResourceList(res.data);
                const itemsOrder = res.data.sort((a: any, b: any) => b.id - a.id);
                handleChangePageResource(0, itemsOrder)
            }
        };

        getUsers();
        getResource();
    }, []);

    return <Router>
        <NavComponent/>

        <Switch>
            <Route path="/list">
                <ListUserComponent loading={loading} pageItems={pageItemsUser} totalItems={filterUserList.length}
                                   handlePage={(currentPage: number) => handleChangePageUser(currentPage)}/>
                <ResourceComponent loading={loading} pageItems={pageItemsResource}
                                   totalItems={filterResourceList.length}
                                   handlePage={(currentPage: number) => handleChangePageResource(currentPage)}/>
            </Route>
            <Route path="/user_actions">
                <ViewUserComponent userList={initialUserList}/>
            </Route>
            <Route path="/resource_actions">
                <ViewResourceComponent resourceList={initialResourceList}/>
            </Route>
            <Route path="/statistics">
                <StatiticsComponent resourceList={initialResourceList}/>
            </Route>
        </Switch>
    </Router>
};

export default MainComponent;

