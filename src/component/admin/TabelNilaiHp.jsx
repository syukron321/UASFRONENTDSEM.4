import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

class TabelNilaiHp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datahp: [],
      searchId: "",
    };
  }

  componentDidMount() {
    this.getDataHp();
  }

  getDataHp = () => {
    axios
      .get("http://localhost:8000/nilai_hp")
      .then((response) => {
        this.setState({ datahp: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleEditChange = (event) => {
    const { selectedItem } = this.state;
    const { name, value } = event.target;
    selectedItem[name] = value;
    this.setState({ selectedItem });
  };

  handleSave = () => {
    const { selectedItem } = this.state;

    axios
      .put(`http://localhost:8000/nilai_hp/${selectedItem.id_hp}`, selectedItem)
      .then((response) => {
        // Handle successful response
        console.log("Data berhasil diperbarui");
        // Reset selected item and reload data
        this.setState({ selectedItem: null }, this.getDataHp);
      })
      .catch((error) => {
        // Handle error
        console.error("Error dalam memperbarui data:", error);
      });
  };

  handleCancel = () => {
    this.setState({ selectedItem: null });
  };

  handleEdit = (item) => {
    this.setState({ selectedItem: item });
  };

  handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/nilai_hp/${item.id_hp}`)
      .then((response) => {
        // Handle successful response
        console.log("Data berhasil dihapus");
        // Reload data
        this.getDataHp();
      })
      .catch((error) => {
        // Handle error
        console.error("Error dalam menghapus data:", error);
      });
  };

  handleSearchChange = (event) => {
    this.setState({ searchId: event.target.value });
  };

  handleSearch = () => {
    const { searchId } = this.state;
    if (searchId) {
      axios
        .get(`http://localhost:8000/nilai_hp/${searchId}`)
        .then((response) => {
          this.setState({ datahp: [response.data] });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ datahp: [] });
        });
    } else {
      this.getDataHp();
    }
  };

  render() {
    const { datahp, selectedItem, searchId } = this.state;

    return (
      <>
        <h1 className="text-center">Stock HP</h1>
        <div className="container mt-3">
          <NavLink to="/tmbnilaihp" className="btn btn-primary btn-sm">
            Tambah Stock
          </NavLink>
          <div className="form-group">
            <label htmlFor="searchId">Search by ID HP:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Cari berdasarkan ID HP"
              value={searchId}
              onChange={this.handleSearchChange}
            />
            <button
              className="btn btn-primary mt-2"
              onClick={this.handleSearch}
            >
              Cari
            </button>
          </div>
          <div className="">
            {selectedItem ? (
              <div>
                <input
                  type="text"
                  name="harga"
                  value={selectedItem.harga}
                  onChange={this.handleEditChange}
                />
                <input
                  type="text"
                  name="kode_hp"
                  value={selectedItem.kode_hp}
                  onChange={this.handleEditChange}
                />
                <input
                  type="text"
                  name="kelas_hp"
                  value={selectedItem.kelas_hp}
                  onChange={this.handleEditChange}
                />
                <input
                  type="text"
                  name="nilai_hp"
                  value={selectedItem.nilai_hp}
                  onChange={this.handleEditChange}
                />
                <button
                  className="btn btn-primary btn-sm"
                  onClick={this.handleSave}
                >
                  Simpan
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={this.handleCancel}
                >
                  Batal
                </button>
              </div>
            ) : (
              <table className="table table-sm" style={{ width: "500px" }}>
                <thead className="">
                  <tr>
                    <th>Id HP</th>
                    <th>Harga</th>
                    <th>Kode HP</th>
                    <th>Stock HP</th>
                    <th>Rangking HP</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {datahp.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.id_hp}</td>
                      <td>{item.harga}</td>
                      <td>{item.kode_hp}</td>
                      <td>{item.nilai_hp}</td>
                      <td>{item.kelas_hp}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => this.handleEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => this.handleDelete(item)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default TabelNilaiHp;
