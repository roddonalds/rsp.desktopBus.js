function toRgba(hex, alpha = 1) {
    let r = 0, g = 0, b = 0;

    // 3 digits
    if (hex.length == 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);

        // 6 digits
    } else if (hex.length == 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}



function auditEschemaAgainstModel(esquema, model) {
    
    const esquemaKeys = Object.keys(esquema);
    const modelKeys = Object.keys(model);

    for (let i = 0; i < esquemaKeys.length; i++) {
        if (!modelKeys.includes(esquemaKeys[i])) {
            return false;
        }
    }

    return true;
}