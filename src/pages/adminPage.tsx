import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import {  IDL, PROGRAM_ID } from '../idl/supplychain';
import { useRole } from '../context/RoleContext';

// Map role strings to their enum values
const ROLE_MAP: Record<Role, number> = {
  Admin: 0,
  Manufacturer: 1,
  Updater: 2
};

export const AdminPage: React.FC = () => {
  const [userAddress, setUserAddress] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('Manufacturer');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { connection } = useConnection();
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  const { role } = useRole();

  const handleAssignRole = async () => {
    if (!publicKey || !signTransaction || !signAllTransactions) {
      setError('Please connect your wallet');
      return;
    }

    if (!userAddress) {
      setError('Please enter a user address');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const provider = new AnchorProvider(
        connection,
        {
          publicKey,
          signTransaction,
          signAllTransactions,
        },
        { commitment: 'confirmed' }
      );

      const program = new Program(IDL, PROGRAM_ID, provider);

      // Find the admin authority PDA
      const [adminAuthorityPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from('admin_authority')],
        program.programId
      );

      // Find the user role PDA
      const [userRolePda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from('user_role'), new web3.PublicKey(userAddress).toBuffer()],
        program.programId
      );

      // Create a PublicKey from the user address
      const userPublicKey = new web3.PublicKey(userAddress);

      // Use type assertion to bypass TypeScript checks for the method signature
      const programMethodsAny = program.methods as any;
      
      // Assign the role
      await programMethodsAny
        .assignRole(userPublicKey, ROLE_MAP[selectedRole])
        .accounts({
          userRole: userRolePda,
          user: userPublicKey,
          adminAuthority: adminAuthorityPda,
          admin: publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();

      setSuccess(`Successfully assigned ${selectedRole} role to ${userAddress}`);
    } catch (err) {
      console.error('Error assigning role:', err);
      setError(err instanceof Error ? err.message : 'Failed to assign role');
    } finally {
      setIsLoading(false);
    }
  };

  if (!role) {
    return (
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="text-center">
                <h1 className="text-2xl font-semibold text-gray-900">Access Denied</h1>
                <p className="mt-2 text-gray-600">You need to be an admin to access this page.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-2xl font-semibold text-gray-900 mb-8">Assign Role</h1>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">User Address</label>
                  <input
                    type="text"
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter Solana address"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as Role)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manufacturer">Manufacturer</option>
                    <option value="Updater">Updater</option>
                  </select>
                </div>

                {error && (
                  <div className="text-red-600 text-sm mt-2">{error}</div>
                )}

                {success && (
                  <div className="text-green-600 text-sm mt-2">{success}</div>
                )}

                <button
                  onClick={handleAssignRole}
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isLoading ? 'Assigning...' : 'Assign Role'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 