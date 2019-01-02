import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { withStyles } from '@material-ui/core/styles';
import Metadata from '../components/Layout/Metadata';
import ContactModal from '../components/Home/ContactModal';

class FamilyHistoryCore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contactActive: false,
      imagesActive: false,
    };
  }

  render() {
    const { classes, data, people } = this.props;
    const { contactActive, imagesActive } = this.state;

    return (
      <React.Fragment>
        <Metadata
          title="Are You a DiLoreto?"
          description="Are you a DiLoreto? View the history of the DiLoretos from Alfadena, Italy to Michigan and California. Extensive historical sources, photos and family tree listed."
        />

        <ContactModal
          open={contactActive}
          onClose={() => this.setState({ contactActive: false })}
          people={people}
        />

        <div className={classes.darkContainer}>
        Family History page
        </div>
      </React.Fragment>
    );
  }
}

FamilyHistoryCore.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.object.isRequired,
    }),
  ).isRequired,
  people: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      link: PropTypes.string,
    }),
  ).isRequired,
};

const styles = theme => ({
  lightContainer: {
    padding: theme.spacing.unit * 2,
  },
  darkContainer: {
    backgroundColor: theme.palette.background.dark,
    padding: theme.spacing.unit * 2,
  },
});

const FamilyHistoryWithStyles = withStyles(styles)(FamilyHistoryCore);

export default () => (
  <StaticQuery
    query={graphql`
      query HistoryQuery {
        allContentfulFamilyHistory(sort: {fields: [year], order: ASC}) {
          edges {
            node {
              year
              title
              content {
                childMarkdownRemark {
                  html
                }
              }
            }
          }
        }
        allContentfulPeople(sort: {fields: [order], order: ASC}) {
          edges {
            node {
              order
              firstName
              fullName
              link
              email
            }
          }
        }
      }
    `}
    render={data => (
      <FamilyHistoryWithStyles
        people={data.allContentfulPeople.edges.map(item => (
          item.node
        ))}
        data={data.allContentfulFamilyHistory.edges.map(item => (
          item.node
        ))}
      />
    )}
  />
);
