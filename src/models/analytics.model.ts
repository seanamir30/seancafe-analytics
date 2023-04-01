import mongoose from "mongoose";

interface IAnalytics {
    url: string;
    userAgent?: string;
}

interface AnalyticsModelInterface extends mongoose.Model<AnalyticsDoc> {
    build(attr: IAnalytics): AnalyticsDoc
}

interface AnalyticsDoc extends mongoose.Document {
    url: string;
    userAgent?: string;
}

const analyticsSchema = new mongoose.Schema({
        url: {
            type: String,
            required: true,
        },
        userAgent: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)

analyticsSchema.statics.build = (attr: IAnalytics) => {
    return new Analytics(attr)
}

const Analytics = mongoose.model<AnalyticsDoc, AnalyticsModelInterface>('Analytics', analyticsSchema)

export { Analytics }