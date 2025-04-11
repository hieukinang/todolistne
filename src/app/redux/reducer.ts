
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Blog {
    id: number
    title: string
    content: string
    author: string
}

interface BlogState {
    blogs: Blog[]
    createModal: boolean
    updateModal: boolean
    deleteModal: boolean
    viewModal: boolean
    blogToCreate: Blog | null
    blogToDelete: Blog | null
    blogToUpdate: Blog | null
    blogToView: Blog | null
}

const initialState: BlogState = {
    blogs: [],
    createModal: false,
    updateModal: false,
    deleteModal: false,
    viewModal: false,
    blogToCreate: null,
    blogToDelete: null,
    blogToUpdate: null,
    blogToView: null,
}

const reducer = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        addBlog: (state, action: PayloadAction<Blog>) => {
            state.blogs.push(action.payload)
        },
        updateBlog: (state, action: PayloadAction<Blog>) => {
            const index = state.blogs.findIndex(b => b.id === action.payload.id)
            if (index !== -1) state.blogs[index] = action.payload
        },
        deleteBlog: (state, action: PayloadAction<number>) => {
            state.blogs = state.blogs.filter(b => b.id !== action.payload)
        },
        viewBlog: (state, action: PayloadAction<Blog>) => {
            state.blogToView = action.payload
            state.viewModal = true
        },
        setCreateModal: (state, action: PayloadAction<boolean>) => {
            state.createModal = action.payload
        },
        setUpdateModal: (state, action: PayloadAction<boolean>) => {
            state.updateModal = action.payload
        },
        setDeleteModal: (state, action: PayloadAction<boolean>) => {
            state.deleteModal = action.payload
        },
        setViewModal: (state, action: PayloadAction<boolean>) => {
            state.viewModal = action.payload
        },
        setBlogToCreate: (state, action: PayloadAction<Blog>) => {
            state.blogToCreate = action.payload
        },
        setBlogToDelete: (state, action: PayloadAction<Blog>) => {
            state.blogToDelete = action.payload
        },
        setBlogToUpdate: (state, action: PayloadAction<Blog>) => {
            state.blogToUpdate = action.payload
        },
        setBlogToView: (state, action: PayloadAction<Blog>) => {
            state.blogToView = action.payload
        }
    }
})

export const {
    addBlog,
    updateBlog,
    deleteBlog,
    viewBlog,
    setUpdateModal,
    setDeleteModal,
    setViewModal,
    setCreateModal,
    setBlogToCreate,
    setBlogToDelete,
    setBlogToUpdate,
    setBlogToView
} = reducer.actions

export default reducer.reducer