function computeDamage (player1, player2, index){
    let jutsu = player1.jutsu[index];
    let damage = (jutsu.power/player2.defense)*jutsu.accuracy;
    return damage;  
}
