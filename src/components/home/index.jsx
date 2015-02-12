var React = require('react');

var Home = React.createClass({
  renderLoginButton: function(){
    return <a href="#" className="btn btn-facebook btn-rounded btn-lg pb-1 pt-1">
      <i className="icon icon-facebook"></i> Connectez vous avec Facebook
      <br/>
      <small className='text-muted'>Connectez vous pour voir lesquels de vos amis ont participé</small>
    </a>
  },
  render: function() {
    return (
      <div className="container pb-2">
        <div className="row">
          <div className="col-md-5 col-md-offset-1 pt-1">
            <h4 className='light'>Personne mieux que vous ne saurait pronostiquer les résultats des César&nbsp;?</h4>
            <p>Vous connaissez tellement bien l’Academy Of Motion Picture Arts and Science que vous savez déjà qui gagnera un Oscar cette année&nbsp;?<br/>Vous êtes le Brian De Palmarès des pronostics ?</p><h4>Prouvez-le&nbsp;!</h4>
            <p>Pronostiquez les résultats des César et des Oscars et montez sur le podium de l’Awards Academy.</p>
            <p>Vous pourrez même imprimer vos pronostics pour votre soirée César/Oscars entre amis.</p><h4>À vos marques… Prêts&nbsp;?... PRONOSTIQUEZ&nbsp;!</h4>
          </div>
          <div className="col-md-5 pt-3">
            {this.renderLoginButton()}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Home;

