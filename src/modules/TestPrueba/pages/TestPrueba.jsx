import React, { useState } from "react";
import Cookies from "js-cookie";
import { Container, Typography, TextField, Button, Box, Paper } from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";

const TestPrueba = () => {
    const [data, setData] = useState({ dato1: "", dato2: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (!data.dato1 || !data.dato2) {
            toast.error("Por favor complete todos los campos");
            return;
        }
        setLoading(true);
        try {
            await axios({
                method: "POST",
                baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                url: "/transforma/api/testPrueba/create",
                headers: {
                    token: Cookies.get("token") || "",
                },
                data: {
                    strDato1: data.dato1,
                    strDato2: data.dato2,
                },
            });
            toast.success("Guardado exitosamente");
            setData({ dato1: "", dato2: "" });
        } catch (error) {
            toast.error("Error al guardar los datos");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: "50px" }}>
            <Paper style={{ padding: "20px" }}>
                <Typography variant="h4" gutterBottom>Test-Prueba</Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Dato 1"
                    name="dato1"
                    value={data.dato1}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Dato 2"
                    name="dato2"
                    value={data.dato2}
                    onChange={handleChange}
                />
                <Box mt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? "Guardando..." : "Guardar"}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default TestPrueba;
