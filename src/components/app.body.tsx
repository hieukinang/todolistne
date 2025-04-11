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


export const ModalContext = createContext<{
    showModalcreate: boolean,
    setShowModalCreate: (value: boolean) => void,
    updateModal: boolean,
    setUpdateModal: (value: boolean) => void,
    deleteModal: boolean,
    setDeleteModal: (value: boolean) => void,
    viewModal: boolean,
    setViewModal: (value: boolean) => void,
    blogs: IBlog | null;
    blogToDelete: IBlog | null;
    blogToUpdate: IBlog | null;
    setBlogs: (blog: IBlog | null) => void;
}>({
    showModalcreate: false,
    setShowModalCreate: () => { },
    updateModal: false,
    setUpdateModal: () => { },
    deleteModal: false,
    setDeleteModal: () => { },
    viewModal: false,
    setViewModal: () => { },
    blogs: null,
    setBlogs: () => { },
    blogToUpdate: null,
    blogToDelete: null,
})
function DarkExample(props: IProps) {
    const { blogs } = props;

    const [showmodalcreate, setShowModalCreate] = useState<boolean>(false);
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [blogToDelete, setBlogToDelete] = useState<IBlog | null>(null);
    const [blogToUpdate, setblogToUpdate] = useState<IBlog | null>(null);
    const [viewModal, setViewModal] = useState<boolean>(false);
    const [blogToView, setBlogToView] = useState<IBlog | null>(null);


    const handleViewClick = (blog: IBlog) => {
        setBlogToView(blog);
        setViewModal(true);
    };
    const handleDeleteClick = (blog: IBlog) => {
        setBlogToDelete(blog);
        setDeleteModal(true);
    };
    const handeditclick = (blog: IBlog) => {
        setblogToUpdate(blog);
        console.log(blogToUpdate);
        setUpdateModal(true)
    }
    return (
        <ModalContext.Provider
            value={{
                showModalcreate: showmodalcreate,
                setShowModalCreate,
                updateModal: updateModal,
                setUpdateModal,
                deleteModal: deleteModal,
                setDeleteModal,
                viewModal: viewModal,
                setViewModal,
                blogs: blogToDelete,
                setBlogs: setBlogToDelete,
                blogToUpdate: blogToUpdate,
                blogToDelete: blogToDelete,
            }}>
            <div
                className='mb-3'
                style={{ display: 'flex', justifyContent: "space-between" }}>
                <h3>Table Blogs</h3>
                <Button variant='secondary' onClick={() => setShowModalCreate(true)}>Add new</Button>
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
                                    <Button variant='warning' className='mx-3' onClick={() => handeditclick(blog)}>edit</Button>
                                    <Button variant='danger' onClick={() => handleDeleteClick(blog)}>delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <CreateModal />
            <UpdateModal
                updateModal={updateModal}
                setUpdateModal={setUpdateModal}
                blog={blogToUpdate || undefined}
            />

            <DeleteModal
            />
            <ViewModal
                viewModal={viewModal}
                setViewModal={setViewModal}
                blog={blogToView || undefined}
            />

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


        </ModalContext.Provider>
    );
}

export default DarkExample;