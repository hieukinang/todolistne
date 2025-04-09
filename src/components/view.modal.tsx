'use client'
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface ViewModalProps {
    viewModal: boolean;
    setViewModal: (value: boolean) => void;
    blog?: IBlog;
}

const ViewModal = ({ viewModal, setViewModal, blog }: ViewModalProps) => {
    const [blogData, setBlogData] = useState<IBlog | null>(null);

    useEffect(() => {
        const fetchBlogDetails = async () => {
            if (blog?.id) {
                try {
                    const response = await axios.get(`http://localhost:8000/blogs/${blog.id}`);
                    setBlogData(response.data);
                } catch (error) {
                    console.error('Error fetching blog details:', error);
                }
            }
        };

        if (viewModal) {
            fetchBlogDetails();
        }
    }, [viewModal, blog?.id]);

    const handleCloseModal = () => {
        setViewModal(false);
        setBlogData(null);
    }

    if (!viewModal) return null;

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
                                value={blogData?.title || ''}
                                readOnly
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={1}
                                value={blogData?.author || ''}
                                readOnly
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={10}
                                value={blogData?.content || ''}
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