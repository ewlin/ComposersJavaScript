/**
* JS Bach's Hot Plate solution 
*/


function tema(size) {
    let emptyPage = Array.apply(null,Array(size*size));
    
    return emptyPage.map((cell,i) => {
        if (isCornerCell(i,size))
            return 0;
        else if (isMiddleCell(i,size))
            return 100; 
        else 
            return 50; 
    });
}


function variazioni(theme, number) {
    'use strict'; 
    
    let size = Math.sqrt(theme.length),
        variation,
        maxChange; 
    
    number = number || 1; 
    
    variation = theme.map((val,i,plate) => {
        let neighbors = neighborCells(i,size,theme),
            change, 
            newVal; 
        
        if (val == 100 || val == 0) 
            newVal = val; 
        else 
            newVal = neighbors.reduce((sum,neighbor) => sum + neighbor)/neighbors.length; 
        
        change = Math.abs(val-newVal); 
        maxChange = maxChange ? (change > maxChange ? change : maxChange) : change; 
        
        return newVal; 
    
    });
    
    if (maxChange < 0.001) 
        return {finalVariation: theme, variationNumber: number}; 
    else 
        return variazioni(variation, number+1);
}

function neighborCells(i, size, plate) {
    if (i % size == 0) 
        return [plate[i-size],plate[i+1],plate[i+size]];
    else if ((i+1) % size == 0) 
        return [plate[i-size],plate[i-1],plate[i+size]];
    else if (i < size)
        return [plate[i-1],plate[i+size],plate[i+1]];
    else if (i > size*(size-1))
        return [plate[i-1],plate[i-size],plate[i+1]];
    else 
        return [plate[i-size],plate[i+1],plate[i-1],plate[i+size]];
}


function isCornerCell(ind, size) {
    return ind == 0 || ind == size-1 || ind == (size*size)-1 || ind == size*(size-1);
}

function isMiddleCell(ind, size) {
    let cellTotal = size*size; 
    
    return ind == cellTotal/2 + size/2 || ind == cellTotal/2 - size/2 
        || ind == cellTotal/2 + (size/2-1) || ind == cellTotal/2 - (size/2+1);
}
