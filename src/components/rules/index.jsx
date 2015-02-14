var React = require('react');

var Rules = React.createClass({

  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-left pt-1">
            <p className="text-info">A part la relative homophonie, l’Award Academy n’a pas grand-chose à voir avec la Star Academy. Chanter devant votre écran d’ordinateur ou de tablette électronique ne vous servira donc à rien – même si nous sommes sûrs que vous avez une très jolie voix.</p>
            <h3>Les règles du jeu sont claires&nbsp;:</h3>
            <ol>
                <li>Faire le pronostic des gagnants aux différentes catégories aux César et/ou aux Oscars.</li>
                <li>Attendre les résultats.</li>
                <li>Pleurer en vous rendant compte que vous avez tout pronostiqué à côté ou sauter de joie parce que vous avez tout bon.</li>
                <li>Vérifier ensuite lequel de vos amis a été moins bon que vous, et ainsi pouvoir faire de son score une source de moquerie jusqu’à l’année prochaine.</li>
                <li>C’est à peu près tout.</li>
                <li>Non en fait, c’est tout.</li>
            </ol>
            <h3>Merci de votre attention, et que le meilleur gagne.</h3>
            <div className="well">
                <p>PS&nbsp;: Il est interdit de prendre en otage l’Académie des Arts et Techniques Du Cinéma pour leur soutirer leurs intentions de vote (d’abord parce que l’Académie compte 4199 membres, et que ça doit pas être coton de prendre en otage autant de gens en même temps), et ensuite parce que c’est pas très sympa.</p>
            </div>
        </div>
      </div>
    </div>
    );
  }

});

module.exports = Rules;
