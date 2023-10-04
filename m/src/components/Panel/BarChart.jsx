import { ResponsiveBar } from "@nivo/bar";
import { FullscreenOutlined as FullscreenIcon } from "@ant-design/icons";

const data = [
  {
    month: "فروردین",
    درخواست: 97,
    "تایید شده": 21,
    "تایید نشده": 35,
  },
  {
    month: "اردیبهشت",
    درخواست: 69,
    "تایید شده": 84,
    "تایید نشده": 29,
  },
  {
    month: "خرداد",
    درخواست: 21,
    "تایید شده": 115,
    "تایید نشده": 35,
  },
  {
    month: "تیر",
    درخواست: 77,
    "تایید شده": 110,
    "تایید نشده": 35,
  },
  {
    month: "مرداد",
    درخواست: 47,
    "تایید شده": 95,
    "تایید نشده": 35,
  },
  {
    month: "شهریور",
    درخواست: 95,
    "تایید شده": 80,
    "تایید نشده": 35,
  },
  {
    month: "مهر",
    درخواست: 80,
    "تایید شده": 56,
    "تایید نشده": 35,
  },
  {
    month: "آبان",
    درخواست: 76,
    "تایید شده": 44,
    "تایید نشده": 19,
  },
  {
    month: "آذر",
    درخواست: 80,
    "تایید شده": 39,
    "تایید نشده": 35,
  },
  {
    month: "دی",
    درخواست: 80,
    "تایید شده": 19,
    "تایید نشده": 16,
  },
  {
    month: "بهمن",
    درخواست: 80,
    "تایید شده": 46,
    "تایید نشده": 35,
  },
  {
    month: "اسفند",
    درخواست: 80,
    "تایید شده": 35,
    "تایید نشده": 45,
  },
];

const customColors = ["#165DFF", "#00BD78", "#FFC107"];

const fullScreen = () => {
  var elem = document.querySelector("#bar-chart");
  elem.requestFullscreen();
};

const BarChart = () => {
  return (
    <div className="relative">
      <span className="absolute z-10 left-2 top-2 text-gray-400 cursor-pointer hidden lg:block" onClick={fullScreen}>
        <FullscreenIcon />
      </span>
      <div className="h-[500px]" id="bar-chart">
        <ResponsiveBar
          data={data}
          keys={["درخواست", "تایید شده", "تایید نشده"]}
          indexBy="month"
          margin={{ top: 50, right: 0, bottom: 40, left: 40 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          groupMode="grouped"
          indexScale={{ type: "band", round: true }}
          colors={customColors}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
          ]}
          fill={[
            {
              match: {
                id: "fries",
              },
              id: "dots",
            },
            {
              match: {
                id: "approved",
              },
              id: "dots",
            },
            {
              match: {
                id: "no-approved",
              },
              id: "dots",
            },
          ]}
          borderColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          legends={[
            {
              dataFrom: "keys",
              itemTextColor: "#999",
              anchor: "top-right",
              direction: "row",
              justify: false,
              translateX: -10,
              translateY: -40,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "right-to-left",
              symbolShape: "circle",
              itemOpacity: 0.7,
              symbolSize: 10,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={(e) => e.id + ": " + e.formattedValue + " در ماه: " + e.indexValue}
        />
      </div>
    </div>
  );
};

export default BarChart;
