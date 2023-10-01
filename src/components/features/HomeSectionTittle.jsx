
  
  const HomeSectionTitle = ({ text, color, titleColro, borderColor }) => {
    return (
      <div className="space-y-4">
        {/* <div className="flex items-center space-x-1">
          <div
            className={`w-16 border-t ${
              borderColor ? borderColor : "border-primaryBlue/60"
            }`}
          ></div>
          <p
            className={` font-manrope ${
              titleColro ? titleColro : "text-primaryBlue/70"
            } font-bold text-sm `}
          >
            Our Recomendations
          </p>
        </div> */}
        <h1
        //   style={{border:"2px solid red",borderBottom:"1px solid "}}
          className={`${
            color ? color : "text-TitleColor"
          } font-semibold w-fit text-3xl font-manrope  border-b-2 border-b-primary-blue `}
        >
          {text}
        </h1>
      </div>
    );
  };
  
  export default HomeSectionTitle;
  