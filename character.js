const STAT_LIMITS = {

    hp: {
        min: 90,
        max: 140
    },

    speed: {
        min: 130,
        max: 180
    },

    crit: {
        min: 0,
        max: 30
    }

};
function getPercent(value,min,max){

    return Math.max(
        0,
        Math.min(
            100,
            ((value-min)/(max-min))*100
        )
    );

}
