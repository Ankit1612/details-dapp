import React, { Component } from 'react'
import { setJSON, getJSON } from './util/IPFS.js'
import { Col, From, Button, FormControl } from 'react-bootstrap';
import Loader from "./Loader"
import { setContractHash, getContractHash } from './services/DetailService';

export class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      myData: "",
      ipfsData: "",
      timestamp: "",
      loading: false
    }
  }

  componentDidMount = async () => {
    this.fetchData()
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const hash = await setJSON({ myData: this.state.myData });
    try {
      await setContractHash(this.props.specificNetworkAddress, hash);
    } catch (error) {
      this.setState({ loading: false });
      alert("there was error with the transcation");
      return;
    }
    this.fetchData();
  }

  fetchData = async () => {
    const contractDetails = await getContractHash(this.props.specificNetworkAddress);
    const ipfsHash = contractDetails[0];
    if(!ipfsHash) { return }
    const timestamp = contractDetails[1].c[0];
    const details = await getJSON(ipfsHash);
    this.setState({ ipfsData: details, loading: false, timestamp })
  }

  handleMyData = (e) => {
    this.setState({ myData: e.target.value });
  }

  render() {
        return (
            <React.Fragment>
                <Col sm={5} >
                    {this.state.timestamp ?
                        <p>Data loaded from Ethereum / IPFS: <br />Time saved to block: {new Date(Number(this.state.timestamp + "000")).toUTCString()}</p>
                        :
                        <div><h4>No record found for this account.</h4><p>Please enter and submit data on the right</p></div>
                    }
                    <div className="blockchain-display">
                        {this.state.ipfsData.myData}
                    </div>

                </Col>
                <Col sm={4} smOffset={2}>
                    <Form horizontal onSubmit={this.handleSubmit}>
                        <h4>Enter Details:</h4>
                        <p>My super tamper proof data:</p>

                        <FormControl componentClass="textarea" type="text" rows="3" placeholder="enter data"
                            value={this.state.myData}
                            onChange={this.handleMyData} />
                        <br />
                        <Button type="submit">Update Details</Button>
                    </Form>
                </Col>
                {this.state.loading &&
                    <Loader />
                }
            </React.Fragment>
        )
    }
}

export default Dashboard
}
