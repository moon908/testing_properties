import BarChart from "./components/chart/BarChart"
import LineChart from "./components/chart/LineChart"
import AddSale from "./components/chart/AddSale"
import PieChart from "./components/chart/PieChart"

const App = () => {
  return (
    <div className="p-10 w-full h-[600px]">
      <AddSale />
      <div className="p-10 flex flex-row gap-4">
        <BarChart />
        <LineChart />
        <PieChart />
      </div>
    </div>
  )
}

export default App