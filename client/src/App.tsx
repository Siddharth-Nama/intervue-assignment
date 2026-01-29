import { UserProvider } from './context/UserContext';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing'; // Placeholder import, will create next
import { Toaster } from 'react-hot-toast'; // Need to install this later or use simple one

// Temporary placeholder for routing
function AppContent() {
  return <Landing />; 
}

function App() {
  return (
    <UserProvider>
        <Layout>
           {/* Router will go here */}
           <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Intervue Poll</h1>
              <p>Select Role to continue (Placeholder)</p>
           </div>
        </Layout>
        <Toaster />
    </UserProvider>
  );
}

export default App;
