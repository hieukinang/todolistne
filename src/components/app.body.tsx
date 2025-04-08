'use client'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import CreateModal from './create.modal';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import UpdateModal from './update.modal';

interface IProps {
    blogs: IBlog[]
}
function DarkExample(props: IProps) {
    const { blogs } = props;

    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [updateModal, setUpdateModal] = useState<boolean>(false);
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
                                    <Button>view</Button>
                                    <Button variant='warning' className='mx-3' onClick={() => setUpdateModal(true)}>edit</Button>
                                    <Button variant='danger'>delete</Button>

                                </td>
                            </tr>
                        )
                    }
                    )}


                </tbody>
            </Table>
            <CreateModal
                showModalCreate={showModalCreate}
                setShowModalCreate={setShowModalCreate} />
            <UpdateModal
                updateModal={updateModal}
                setUpdateModal={setUpdateModal}
            />
        </>
    );
}

export default DarkExample;