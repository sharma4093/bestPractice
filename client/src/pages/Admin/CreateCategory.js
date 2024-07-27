import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import { Button, Modal } from 'antd';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material'



const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [loading, setLoading] = useState(false);




    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name });
            if (data?.success) {
                toast.success(`${name} is created !`);
                getAllCategory();
            } else {
                toast.error(data?.message)
            }

        } catch (error) {
            console.log("Error While submiting data in form-->", error);
            toast.error("Error in submit Data😢")

        }
    }

    const getAllCategory = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            // console.log(data);
            if (data?.success) {
                setCategories(data?.category)
            }
            setLoading(false);

        } catch (error) {
            console.log("Error in getting All Categories-->", error);
            toast.error("Something went wrong!!😢😢")

        }
    }

    useEffect(() => {

        getAllCategory();
    }, []);


    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, { name: updatedName });
            if (data.success) {
                toast.success(`${updatedName} is updated!`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            }
            else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log("Error while updating Category-->", error);
            toast.error("Something went Wrong😢");

        }

    }

    const handleDelete = async (pid) => {

        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`);
            if (data.success) {
                toast.success(`Category is Deleted!`);
                getAllCategory();
            }
            else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log("Error while Deleting Category-->", error);
            toast.error("Something went Wrong😢");

        }

    }




    return (
        <Layout title={"Dashboard - Create Category"}>
            <div style={{ marginTop: "80px" }} className="container-fluid m-3 p-3">
                <div className="row ">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1> Manage Category</h1>
                        <div className="p-3 w-50">
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName}


                            />
                        </div>




                        <div className="w-75">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        loading ? (
                                            <div className="d-flex justify-content-center w-100">
                                                <Box sx={{ width: '100%' }}>
                                                    <LinearProgress />
                                                </Box>

                                            </div>
                                        ) : (
                                            <>
                                                {categories?.map(c => (
                                                    <tr>
                                                        <td key={c._id}>{c.name}</td>
                                                        <td >
                                                            <button onClick={() => {
                                                                setVisible(true);
                                                                setUpdatedName(c.name);
                                                                setSelected(c)
                                                            }} className="btn btn-primary ms-2">Edit</button>
                                                            <button
                                                                className="btn btn-danger ms-2"
                                                                onClick={() => { handleDelete(c._id) }}>
                                                                Delete
                                                            </button>

                                                        </td>
                                                    </tr>
                                                ))}
                                            </>
                                        )
                                    }


                                </tbody>
                            </table>

                        </div>
                    </div>

                    <Modal
                        onCancel={() => setVisible(false)}
                        visible={visible}
                        footer={null}
                    >
                        <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />

                    </Modal>


                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory