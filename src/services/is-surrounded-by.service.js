
export const isSurroundedBy = (
    str,
    start,
    end = start
) => str.substr(0, start.length) === start
    && str.substr(str.length - end.length) === end;
