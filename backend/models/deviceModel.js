const deviceSchema = new mongoose.Schema({
    uniqueSerialNumber:{
        type: String,
        required: true
    },
    type:{
        type: String,
        enum:['pos','kiosk','signage'],
        required: true
    },
    image:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    locationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    }
});
const DeviceModel = mongoose.model('Device', deviceSchema);

module.exports = DeviceModel;