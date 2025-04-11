'use client'
import { Button, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import CreateModal from './create.modal';
import { ToastContainer, toast } from 'react-toastify';
import { createContext, useState } from 'react';
import UpdateModal from './update.modal';
import DeleteModal from './delete.modal'
import ViewModal from './view.modal'

interface IProps {
    blogs: IBlog[]
}

import {
    setCreateModal,
    setUpdateModal,
    setDeleteModal,
    setViewModal,
    setBlogToDelete,
    setBlogToUpdate,
    setBlogToView,
    setBlogToCreate
} from '@/app/redux/reducer';
import { useDispatch, useSelector } from 'react-redux';
function DarkExample(props: IProps) {
    const { blogs } = props;
    const dispatch = useDispatch();
    const {
        createModal,
        updateModal,
        deleteModal,
        viewModal,
        blogToDelete,
        blogtoCreate,
        blogToUpdate,
        blogToView
    } = useSelector((state: any) => state.blog);
    const handleCreateClick = (blog: IBlog) => {
        dispatch(setBlogToCreate(blog));
        dispatch(setCreateModal(true));
    };
    console.log("createModal =", useSelector((state: any) => state.blog.createModal));

    const handleDeleteClick = (blog: IBlog) => {
        dispatch(setBlogToDelete(blog));
        dispatch(setDeleteModal(true));
    };

    const handleEditClick = (blog: IBlog) => {
        dispatch(setBlogToUpdate(blog));
        dispatch(setUpdateModal(true));
    }
    const handleViewClick = (blog: IBlog) => {
        dispatch(setBlogToView(blog));
        dispatch(setViewModal(true));
    }
    return (
        <>
            <div
                className='mb-3'
                style={{ display: 'flex', justifyContent: "space-between" }}>
                <h3>Table Blogs</h3>
                <Button variant='secondary' onClick={() => handleCreateClick({} as IBlog)}>Add new</Button>
            </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs?.map(blog => {
                        return (
                            <tr key={blog.id}>
                                <td>{blog.id}</td>
                                <td>{blog.title}</td>
                                <td>{blog.author}</td>
                                <td>
                                    <Button variant='info' onClick={() => handleViewClick(blog)}>view</Button>
                                    <Button variant='warning' className='mx-3' onClick={() => handleEditClick(blog)}>edit</Button>
                                    <Button variant='danger' onClick={() => handleDeleteClick(blog)}>delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <CreateModal />
            <UpdateModal />

            <DeleteModal
            />
            <ViewModal />

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />


        </>
    );
}

export default DarkExample;