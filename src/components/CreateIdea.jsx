import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PopUpConfirmIdea from './PopUp/PopUpConfirmIdea';
import PopUpIdea from './PopUp/PopUpIdea';
import Backdrop from './Backdrop';
import { connect } from 'react-redux'
import { AddIdeaAction }from './../stores/actions/challengeAction'
import LogoPhoto from './pictures/image-add-button.png'
import Arrow from './pictures/left-arrow-(2).png'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: '1em',
    paddingBottom: "3em"
  },
  textField: {
    margin: theme.spacing.unit,
    width: '90vw',
    marginLeft: '5vw'
  },
  title: {
    backgroundColor: "#e8e8e8",
    padding: "2vw 5vw",
    width: "100vw",
    margin: "2vw 0",
  },
  button : {
    marginTop: "1em",
    marginBottom: "1em",
    width: "40vw",
    marginLeft: "5vw",
    backgroundColor: "#039ce0",
    border: "none",
    height: "10vw",
    borderRadius: "15px",
    color: 'white',
    fontSize: "4vw",
    fontWeight: "bold"
  },
  logo: {
    width: "30vw",
    margin: 'auto',
  },
  containerPhoto: {
    display: "flex",
    backgroundColor: "#039ce0",
    width: "100vw",
    height: "20em"
  },
  arrow: {
    position: "absolute",
    width: "10vw",
    marginTop: "1em",
    marginLeft: "2vw"
  },
});

class CreateIdea extends Component {
  state = {
    popupConfirm: false,
    popupThank: false,
    image: "",
    nom:'',
    categorie:'',
    description: "",
    decision: "",
    complexite: "",
    cout: "",
    duree: ""
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  backdropClickHandler = () => {
    this.setState({popupConfirm: false, popupThank: false})
  }
  
  popupConfirm = (e) => {
    e.preventDefault()
    this.setState({popupConfirm: true, popupThank: false})
  }
  
  popupThank = (e) => {
    let id = this.props.challenges.list[0].ideas.length + 1
    this.setState({popupConfirm: false, popupThank: true})
    e.preventDefault()
    this.props.AddIdeaAction({
        id: id,
        image: this.state.image,
        nom:this.state.nom,
        categorie:this.state.categorie,
        description: this.state.description,
    })
  }
  
  render() {
    const { classes } = this.props;
    return (

      <Grid container>

        {this.state.popupConfirm &&
          <div>
            <PopUpConfirmIdea close={this.backdropClickHandler} confirm={(e)=> this.popupThank(e)}/>
            <Backdrop click={this.backdropClickHandler}/>
          </div>
        }

        {this.state.popupThank &&
          <div>
            <PopUpIdea close={this.backdropClickHandler} id={this.props.id}/>
            <Backdrop/>
          </div>
        }

{/* PHOTO */}

        <div className={classes.containerPhoto}>
          <NavLink to={`/8/${this.props.id}/0`}>
            <img src={Arrow} alt="Back" className={classes.arrow}/>
          </NavLink>
          <img src={LogoPhoto} alt="Logo" className={classes.logo}/>
        </div>

        <form className={classes.container} onSubmit={(e) => this.popupConfirm(e)}>

{/* NAME */}

          <TextField
            required
            label="Idée"
            className={classes.textField}
            name='nom'
            value={this.state.nom}
            onChange={(e) => this.handleChange(e)}
          />

{/* CATEGORIE CONCERNEE */}

          <TextField
            required
            select
            label="Catégorie concernée"
            className={classes.textField}
            name='categorie'
            value={this.state.categorie}
            onChange={(e) => this.handleChange(e)}
            SelectProps={{
              native: true,
              MenuProps: {
                className: classes.menu,
              },
            }}
          >
            <option defaultValue=""></option>
            {this.props.challenges.list[0].categories.list.map(option => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          </TextField>

{/* DESCRIPTION */}
        
          <TextField
            required
            label="Description"
            multiline
            rows="4"
            name="description"
            value={this.state.description}
            onChange={(e) => this.handleChange(e)}
            className={classes.textField}
          />

{/* FAISABILITE */}

          <p className={classes.title}>Faisabilité</p>

{/* DECISION */}

          <TextField
            required
            select
            label="Décision"
            className={classes.textField}
            name='decision'
            value={this.state.decision}
            onChange={(e) => this.handleChange(e)}
            SelectProps={{
              native: true,
              MenuProps: {
                className: classes.menu,
              },
            }}
          >
              <option value=""></option>
              <option value={5}>Local</option>
              <option value={4}>Manager</option>
              <option value={3}>Fonction support</option>
              <option value={2}>Inter-métier</option>
              <option value={1}>Process-stratégique</option>
            ))}
          </TextField>

{/* COMPLEXITE */}

          <TextField
            required
            select
            label="Complexité"
            className={classes.textField}
            name='complexite'
            value={this.state.complexite}
            onChange={(e) => this.handleChange(e)}
            SelectProps={{
              native: true,
              MenuProps: {
                className: classes.menu,
              },
            }}
          >
              <option value=""></option>
              <option value={5}>Facile</option>
              <option value={4}>Moyen</option>
              <option value={3}>Difficile</option>
              <option value={2}>Complexe</option>
              <option value={1}>Très complexe</option>
            ))}
          </TextField>

{/* COUT */}

          <TextField
            required
            select
            label="Coût"
            className={classes.textField}
            name='cout'
            value={this.state.cout}
            onChange={(e) => this.handleChange(e)}
            SelectProps={{
              native: true,
              MenuProps: {
                className: classes.menu,
              },
            }}
          >
              <option value=""></option>
              <option value={5}>Zéro</option>
              <option value={4}>Faible</option>
              <option value={3}>Moyen</option>
              <option value={2}>Cher</option>
              <option value={1}>Très cher</option>
            ))}
          </TextField>

{/* DUREE */}

          <TextField
            required
            select
            label="Durée"
            className={classes.textField}
            name='duree'
            value={this.state.duree}
            onChange={(e) => this.handleChange(e)}
            SelectProps={{
              native: true,
              MenuProps: {
                className: classes.menu,
              },
            }}
          >
              <option value=""></option>
              <option value={5}>1 semaine</option>
              <option value={4}>2 semaines</option>
              <option value={3}>1 mois</option>
              <option value={2}>3 mois</option>
              <option value={1}>6 mois</option>
            ))}
          </TextField>

          <Grid container>
          
{/* BUTTON ENREGISTRER */}
              
            <Grid item xs={6}>
              <NavLink to={`/8/${this.props.id}/0`}>
                <button className={classes.button}>Enregistrer</button>
              </NavLink>
            </Grid>

{/* BOUTON PARTAGER */}

            <Grid item xs={6}>
              <button 
              type="submit"
              className={classes.button}>Partager</button>
            </Grid>

          </Grid>
        </form>

      </Grid>
    );
  }
}

CreateIdea.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchToProps = {
  AddIdeaAction
}


export default connect(mapStateToProps,mapDispatchToProps) (withStyles(styles)(CreateIdea))
