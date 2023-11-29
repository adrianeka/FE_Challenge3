import logo from "./logo.svg";
import "./App.css";
import { Button, Form, Modal, Tab, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [barangData, setBarangData] = useState([]);
  useEffect(() => {
    // URL API yang akan diambil datanya
    const apiUrl = "http://localhost:8080/api/barang";

    // Menggunakan Axios untuk mengambil data dari API
    axios
      .get(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        // Mengatur data dosen ke dalam state dosenData

        console.log(response.data);
        setBarangData(response.data);
      })
      .catch((error) => {
        // Handle error jika terjadi kesalahan saat mengambil data dari API
        console.error("Error fetching data:", error);
      });
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = "http://localhost:8080/api/barang/create"; // Sesuaikan dengan URL API barang Anda
    const newBarang = {
      KodeBarang: formData.KodeBarang,
      NamaBarang: formData.NamaBarang,
      Satuan: formData.Satuan,
      HargaSatuan: formData.HargaSatuan,
      Stok: formData.Stok,
    };

    try {
      const response = await axios.post(apiUrl, newBarang, {
        withCredentials: true, // Sesuaikan dengan kebutuhan autentikasi jika diperlukan
      });
      console.log("Barang created successfully:", response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message)
        console.log(error.response.data);
    }
  };

  return (
    <div className="container">
      <div style={{ height: "100vh" }}>
        <h2 className="my-5 text-center">DATA BARANG</h2>

        <Button variant="primary" onClick={handleShow} className="my-5">
          Create
        </Button>
        <div>
          {" "}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>KodeBarang</th>
                <th>NamaBarang</th>
                <th>Satuan</th>
                <th>HargaSatuan</th>
                <th>Stok</th>
              </tr>
            </thead>
            <tbody>
              {barangData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Data
                  </td>
                </tr>
              ) : (
                barangData.map((barang) => (
                  <tr key={barang.KodeBarang}>
                    <td>{barang.KodeBarang}</td>
                    <td>{barang.NamaBarang}</td>
                    <td>{barang.Satuan}</td>
                    <td>{barang.HargaSatuan}</td>
                    <td>{barang.Stok}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>CREATE DATA BARANG</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Kode Barang</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Kode Barang"
                  name="KodeBarang"
                  value={formData.KodeBarang}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nama Barang</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama Barang"
                  name="NamaBarang"
                  value={formData.NamaBarang}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Satuan</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Satuan"
                  name="Satuan"
                  value={formData.Satuan}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Harga Satuan</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Harga Satuan"
                  name="HargaSatuan"
                  value={formData.HargaSatuan}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Stok</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Stok"
                  name="Stok"
                  value={formData.Stok}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleClose}>
                Save Changes
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>

      {/* Data Kasir */}
      <div div style={{ height: "100vh" }}>
        <h2 className="my-5 text-center">Data Kasir</h2>
        <div>
          {" "}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>KodeBarang</th>
                <th>NamaBarang</th>
                <th>Satuan</th>
                <th>HargaSatuan</th>
                <th>Stok</th>
              </tr>
            </thead>
            <tbody>
              {barangData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Data
                  </td>
                </tr>
              ) : (
                barangData.map((barang) => (
                  <tr key={barang.KodeBarang}>
                    <td>{barang.KodeBarang}</td>
                    <td>{barang.NamaBarang}</td>
                    <td>{barang.Satuan}</td>
                    <td>{barang.HargaSatuan}</td>
                    <td>{barang.Stok}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default App;
