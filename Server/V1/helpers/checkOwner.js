const checkOwner = (req, entryId) => {
    if (entryId !== req.tokenData.id) {
        return false;
    }
    return true;
};
export default checkOwner;
