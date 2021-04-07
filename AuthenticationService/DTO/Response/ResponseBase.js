let ResponseBase  = class {
    constructor(IsSuccessful,Message){
        this.IsSuccessful = IsSuccessful,
        this.Message = Message
    }
}
module.exports = ResponseBase;