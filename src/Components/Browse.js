// import './css/style.css';
import { Link } from 'react-router-dom'
// export default Browse;
import React, { Component } from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { environment } from '../services/DeveloperService';
import { Table } from 'react-bootstrap';


class Browse extends Component {

  constructor(props) {
    super(props)

    this.state = {
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 6,
      currentPage: 0
    }

    this.handlePageClick = this.handlePageClick.bind(this);

  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.loadMoreData()
    });

  };

  loadMoreData() {
    const data = this.state.orgtableData;

    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      tableData: slice
    })

  }

  componentDidMount() {
    this.getData();
  }
  getData() {
    axios
      .get(`${environment.baseUrl}`)
      .then(res => {
        var tdata = res.data;
        var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
          pageCount: Math.ceil(tdata.length / this.state.perPage),
          orgtableData: tdata,
          tableData: slice
        })
      });
  }


  render() {
    return (
      <div>
        <div id="container">
          <nav id="leftMenu">
            <h3>Links</h3>
            <ul>
              <li><Link to="/dashboard">SEO</Link></li>
              <li><Link to="/dashboard">PHP</Link></li>
              <li><Link to="/dashboard">Ajax</Link></li>
              <li><Link to="/dashboard">jQuery</Link></li>
              <li><Link to="/dashboard">Web design</Link></li>
              <li><Link to="/dashboard">Web Programming</Link></li>
              <li><Link to="/dashboard">Content Creation</Link></li>
              <li><Link to="/dashboard">Internet Marketing</Link></li>
              <li><Link to="/dashboard">XHTML Templates</Link></li>
            </ul>
          </nav>
          <section>
            <h3>Browse Developers</h3>

            <Table className="table table-bordered table-striped table-hover" responsive>
              <thead style={{ backgroundColor: "#054caa" }}>
                <tr>
                  <th scope="row">Name</th>
                  <th scope="row">Email</th>
                  <th scope="row">Group</th>
                </tr>

              </thead>
              <tbody>
                {
                  this.state.tableData.map((developer) => (
                    <tr>
                      <td>{developer.full_name}</td>
                      <td>{developer.email}</td>
                      <td>{developer.group}</td>
                    </tr>

                  ))
                }

              </tbody>
            </Table>

            <ReactPaginate
              previousLabel={"<< Prev"}
              nextLabel={"Next >>"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"} />
          </section>
        </div>
        <div style={{ clear: "both" }}></div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <footer>
          Copyright 2017. DCX Developer Directory.
      </footer>
      </div>
    )
  }
}

export default Browse
