'use client'
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogToView, setViewModal } from '@/app/redux/reducer';

const ViewModal = () => {
    const dispatch = useDispatch();
    const blogToView = useSelector((state: any) => state.blog.blogToView);
    const viewModal = useSelector((state: any) => state.blog.viewModal);
    const [title, setTitle] = useState<string>("")
    const [author, setAuthor] = useState<string>("")
    const [content, setContent] = useState<string>("")


    useEffect(() => {
        if (blogToView) {
            setTitle(blogToView.title)
            setAuthor(blogToView.author)
            setContent(blogToView.content)
        }
    }, [blogToView])


    const handleCloseModal = () => {
        setTitle("")
        setAuthor("")
        setContent("")
        dispatch(setViewModal(false))
        dispatch(setBlogToView({} as any))
    }

    return (
        <>
            <Modal
                show={viewModal}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>View Blog Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={1}
                                value={title || ''}
                                readOnly
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={1}
                                value={author || ''}
                                readOnly
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={10}
                                value={content || ''}
                                readOnly
                                disabled
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ViewModal;