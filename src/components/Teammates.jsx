import { Link } from 'react-router-dom';

const Teammates = ({ player, teammates }) => {
  return (
    <div className='team'>
      <h2>{player.team ? 'Team ' + player.team.name : 'Unassigned'}</h2>
      <div className='teammate'>
        {teammates
          .sort((a, b) =>
            a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
          )
          .map((teammate) => {
            if (player.id !== teammate.id)
              return (
                <Link key={teammate.id} to={`/players/${teammate.id}`}>
                  {teammate.name}
                </Link>
              );
          })}
      </div>
    </div>
  );
};

export default Teammates;
