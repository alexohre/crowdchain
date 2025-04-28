import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { recentContributions } from '../data/contribution';

// Process data for the chart
const processedData = recentContributions
  .map(contribution => ({
    date: contribution.date,
    amount: parseFloat(contribution.amount.split(' ')[0]), // Extract numeric value from "5.2 ETH"
  }))
  .reverse(); // Show oldest to newest

export default function ContributionHistory() {
  return (
    <div className="w-full p-6 bg-white rounded-lg border border-[#E5E7EB]">
      <h2 className="text-xl font-semibold text-black mb-4">Contribution History</h2>
      <div className="h-[300px] w-full text-black">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={processedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#4B5563' }}
            />
            <YAxis 
              tick={{ fill: '#4B5563' }}
              label={{ angle: -90, position: 'insideLeft', fill: '#4B5563' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="amount" 
              name="ETH Amount"
              stroke="#0A4D1C" 
              strokeWidth={2}
              dot={{ fill: '#0A4D1C', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
