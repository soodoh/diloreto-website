import React from 'react';
import PropTypes from 'prop-types';
import { uid } from 'react-uid';
import { StaticQuery, graphql } from 'gatsby';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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

        <div className={classes.lightContainer} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="subtitle1" align="center" gutterBottom>
          A genealogical record of the DiLoreto lineage is maintained, and we would love to hear from any relatives with updates. An updated copy of the complete family tree can be sent as a PDF to family members.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => this.setState({ contactActive: true })}
          >
          Contact Us
          </Button>
        </div>

        {data.map((record, index) => (
          <div
            className={index % 2 === 0
              ? classes.lightContainer
              : classes.darkContainer
            }
            key={uid(record)}
          >
            <Typography variant="h1" align="center">{record.title}</Typography>

            <Typography
              variant="body1"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: record.content.childMarkdownRemark.html }}
            />
          </div>
        ))}
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
