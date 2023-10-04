import classes from "./Banner.module.css";

const Banner = () => {
  return (
    <div className={classes.banner}>
      <div className="flex flex-col justify-center text-white py-4 gap-2 px-4 text-sm text-right">
        <p>به پنل مدیریت خوش آمدید!</p>
        {/* <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، </p> */}
      </div>
    </div>
  );
};

export default Banner;
