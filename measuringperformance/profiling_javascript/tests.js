/*
    - Build up to 250,000 creatures.
    - Find if any have a volume bigger than 180,000
    - If they do, return it
*/

function example1() {
    creatures = [];
    
    for(i = 0; i < 250000; i++) {
        newCreature = {
            id: i,
            dimensions: {
                height: Math.round(Math.random() * 200),
                width: Math.round(Math.random() * 100),
                depth: Math.round(Math.random() * 10)
            },
            birthDate: new Date()
        };
        
        creatures.push(newCreature);
    }
    
    for(i = 0; i < creatures.length; i++) {
        if((creatures[i].dimensions.height * creatures[i].dimensions.width * creatures[i].dimensions.depth) > 180000) {
            bigCreature = creatures[i];
        }
    }
    
    return bigCreature;
}

function example2() {    
    var birthDate = new Date();
    
    for(var i = 0; i < 250000; i++) {
       var newCreature = {
            id: i,
            dimensions: {
                height: Math.round(Math.random() * 200),
                width: Math.round(Math.random() * 100),
                depth: Math.round(Math.random() * 10)
            },
            birthDate: birthDate
        };
        
        if((newCreature.dimensions.height * newCreature.dimensions.width * newCreature.dimensions.depth) > 180000) {
            return newCreature;
        }
    }
}