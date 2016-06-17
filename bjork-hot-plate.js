/**
* Bjork's Hot Plate solution 
*/

function homeostasis(size) {
    var organism = [],
        nextStage = [],
        isStillCooling = true, 
        stages = 0;
    
    //Verse
    //Watch how it grows, watch how it grows...
    //From nothing to living, cell begets cell...
    for (var row=0; row<size; row++) {
        organism.push([]);
        nextStage.push([]);
      
        //growing, and growing, warmer and warmer...
        for (var col=0; col<size; col++) {
            var bodyTempIs; 
            
            if (imOnTheEdge(row,col,size))
                bodyTempIs = 0;
            else if (imTheCore(row,col,size))
                bodyTempIs = 100; 
            else 
                bodyTempIs = 50; 
            
            
            organism[row][col] = bodyTempIs;
        }
    }
    
    //Chorus, again and again
    //I overcome the heat, as it dissipates above us...
    while (isStillCooling) {
      
        var greatestChange = null; 
        
        organism.forEach(function(layer,layerNumber) {
            layer.forEach(function(cell,cellLocation) {
                var embracedBy = [],
                    changedBy; 
                
                if (!imOnTheEdge(layerNumber,cellLocation,size) && !imTheCore(layerNumber,cellLocation,size)) {
                    
                    if (layerNumber !== 0) embracedBy.push(organism[layerNumber-1][cellLocation]);
                    if (layerNumber !== size-1) embracedBy.push(organism[layerNumber+1][cellLocation]);
                    if (cellLocation !== 0) embracedBy.push(organism[layerNumber][cellLocation-1]);
                    if (cellLocation !== size-1) embracedBy.push(organism[layerNumber][cellLocation+1]);
                    
                    nextStage[layerNumber][cellLocation] = illTransformIntoThoseWhoEmbraceMe(embracedBy);
                    
                } else {
                    nextStage[layerNumber][cellLocation] = cell; 
                }
                
                changedBy = Math.abs(cell-nextStage[layerNumber][cellLocation]);
                greatestChange = greatestChange ? (changedBy > greatestChange ? changedBy : greatestChange) : changedBy;
                    
            });
        }); 
    
        organism = nextStage; 
        stages += 1; 
        
        if (greatestChange < 0.001) isStillCooling = false; 
    }
    
    
    //Coda
    return organism;
    
    
    
    function illTransformIntoThoseWhoEmbraceMe(embracedBy) {
        return embracedBy.reduce(function(all,one) {
            return all + one; 
        })/embracedBy.length;       
    }
    
    function imOnTheEdge(row,col,size) {
        return (col == 0 || col == size-1) && (row == 0 || row == size-1);
    }

    
    function imTheCore(row,col,size) {
        return (col == size/2 || col == size/2-1) && (row == size/2 || row == size/2-1)
    }

    
}

