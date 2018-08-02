import React, {Component} from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {

  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    // console.log(summary);
    return{
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount:summary[3],
      manager: summary[4]
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'address of Manager',
        description: 'manager created this campaign',
        style: {overflowWrap: 'break-word'}
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description: 'you must contribute at least this much wei'
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description: 'requests!!!!'
      },
      {
        header: approversCount,
        meta: 'Approvers',
        description: 'already donated'
      },
      {
        header: web3.utils.fromWei(balance,'ether'),
        meta: 'Campaign balance (ether)',
        description: 'the balance is how much money this campaign has left to spend'
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return(
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
              
            </Grid.Column>
            <Grid.Column width={6}><ContributeForm address={this.props.address}/></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a><Button primary>View Requests</Button></a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    ); 
  }
}
export default CampaignShow;