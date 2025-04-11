'use client'
import { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { mutate } from "swr"
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setCreateModal } from '@/app/redux/reducer';

function CreateModal() {
    const showModalCreate = useSelector((state: any) => state.blog.createModal);
    const [title, setTitle] = useState<string>("")
    const [author, setAuthor] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const dispatch = useDispatch();
    const handleSubmit = () => {
        if (!title) {
            toast.warning("ko dc dau be oi :)")
            return
        }
        if (!author) {
            toast.warning("ko dc dau be oi :)")
            return
        }
        if (!content) {
            toast.warning("ko dc dau be oi :)")
            return
        }
        axios.post("http://localhost:8000/blogs", {
            title: title,
            content: content,
            author: author
        }).then(res => {
            if (res) {
                mutate("http://localhost:8000/blogs")
                toast.success("hehe dc r kia :)")
                handleCloseModal()

            }
        });
    }
    const handleCloseModal = () => {
        setTitle("")
        setAuthor("")
        setContent("")
        dispatch(setCreateModal(false))
    }
    return (
        <>
            <Modal
                show={showModalCreate}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new a blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control as="textarea" rows={1}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Author</Form.Label>
                            <Form.Control as="textarea" rows={1}
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows={10}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateModal;