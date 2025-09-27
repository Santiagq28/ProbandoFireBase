import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { FaEye, FaEyeSlash } from "react-icons/fa";


function RegisterPage() {
  
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "", correo: "", clave: "", confirmarClave: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      nombre, correo, clave, confirmarClave
    } = formData;

    // Validaciones
    if(
      !nombre || !correo || !clave || !confirmarClave
    ){
      return alert("Todos los campos son obligatorios");
    }
    if(clave.length < 6){
      return alert("La contraseña debe tener más caracteres");
    }
    if(clave !== confirmarClave){
      return alert("Las contraseñas no son iguales");
    }
    try{
      const emaillower = correo.toLocaleLowerCase();


      //Crea usuario para el servicio de autenticación de firebase
      const userMethod = await createUserWithEmailAndPassword(auth, emaillower, clave) ;
      const user = userMethod.user;

      // Guardar datos en firestore
      await setDoc (doc(db, "usuarios", user.uid), {
        uid: user.uid, 
        nombre, correo: emaillower, estado: "pendiente", rol: "visitante", creado: new Date(), metodo: "clave"
      });

      alert("Registrado😁👍! Usario Creado con Éxito");
      navigate("/login")
    }catch (error){
      console.error("Error de registro: ", error);

      if(error.code === "auth/email-already-in-use"){
        alert("Correo en uso, Debe ingresar con otro correo 😒");
      }
    }
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#f0f0f0]">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">

          <div className="flex justify-center mb-6">
          <img 
            src="../../public/logo.png" 
            alt="logo" 
            className="w-40 h-40 rounded-2xl" 
          />
        </div>

        <h2 className="text-3xl font-extrabold text-center text-black mb-6">
          REGISTRARSE
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <label className=" w-full input input-bordered rounded-2xl border-black flex items-center gap-2 bg-white/10 text-black placeholder-black">
            <svg
              className="h-5 opacity-70"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <input
              name="nombre" 
              type="text"
              required
              placeholder="Username"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minLength="3"
              maxLength="30"
              title="Only letters, numbers or dash"
              className="grow bg-transparent focus:outline-none"
              value={formData.nombre}
              onChange={handleChange}
            />
          </label>

          
          <label className="w-full input input-bordered rounded-2xl border-black flex items-center gap-2 bg-white/10 text-black placeholder-black">
            <svg
              className="h-5 opacity-70"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              name="correo" 
              type="email"
              placeholder="example@gmail.com"
              required
              className="grow bg-transparent focus:outline-none"
              value={formData.correo}
              onChange={handleChange}
            />
          </label>

          
          <label className="w-full input input-bordered rounded-2xl border-black flex items-center gap-2 bg-white/10 text-black placeholder-black">
            <svg
              className="h-5 opacity-70"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              name="clave" 
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              //minLength="8"
              //pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              //title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              className="grow bg-transparent focus:outline-none"
              value={formData.clave}
              onChange={handleChange}
            />
            <button 
              type="button"
              className="p-2 rounded hover:cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash/>: <FaEye/>}

            </button>
          </label>

           <label className="w-full input input-bordered rounded-2xl border-black flex items-center gap-2 bg-white/10 text-black placeholder-black">
            <svg
              className="h-5 opacity-70"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              name="confirmarClave" 
              type={showConfirmPassword ? "text" : "password"}
              required
              placeholder="Confirm Password"
              //minLength="8"
              //pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              //title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              className="grow bg-transparent focus:outline-none"
              value={formData.confirmarClave}
              onChange={handleChange}
            />
            <button 
              type="button"
              className="p-2 rounded hover:cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash/>: <FaEye/>}

            </button>
          </label>

          
          <button
            type="submit"
            className="btn btn-dash btn-info w-full rounded-xl shadow-lg transition-all duration-500 hover:scale-105"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-black">
          ¿Ya tienes cuenta?{" "}
          <a
            href="/"
            className="font-medium text-blue-400 hover:text-blue-300 hover:underline"
          >
            Inicia sesión
          </a>
        </p>

        
      </div>
    </section>
  );
}

export default RegisterPage;