'use client'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import CreateModal from './create.modal';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import UpdateModal from './update.modal';
import DeleteModal from './delete.modal'
import ViewModal from './view.modal'
interface IProps {
    blogs: IBlog[]
}

function DarkExample(props: IProps) {
    const { blogs } = props;

    const [showmodalcreate, setShowModalCreate] = useState<boolean>(false);
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [blogToDelete, setBlogToDelete] = useState<IBlog | null>(null);
    const [blogToedit, setBlogToedit] = useState<IBlog | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
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
        setBlogToedit(blog);
        console.log(blogToedit);
        setUpdateModal(true)
    }
    return (
        <>
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
            <CreateModal
                showModalCreate={showmodalcreate}
                setShowModalCreate={setShowModalCreate} />
            <UpdateModal
                updateModal={updateModal}
                setUpdateModal={setUpdateModal}
                blog={blogToedit || undefined}
            />

            <DeleteModal
                isOpen={deleteModal}
                onClose={() => setDeleteModal(false)}
                id={blogToDelete?.id ?? 0}
                title="Delete Blog"
                message={`Are you sure you want to delete this blog?`}
                onSuccess={() => {
                    window.location.reload();
                }}
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


        </>
    );
}

export default DarkExample;