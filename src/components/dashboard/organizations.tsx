"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, ArrowRight, Plus, Star, Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";

interface Organization {
    id: string;
    name: string;
    image: string;
    openIssues: number;
}

interface OrganizationsData {
    accessedOrganizations: Organization[];
    nonAccessedOrganizations: Organization[];
}

interface ApiResponse {
    success: boolean;
    data: OrganizationsData;
    status: number;
}

interface ApiError {
    success: false;
    error: string;
}

export default function Organizations() {
    const [organizations, setOrganizations] = useState<OrganizationsData>({
        accessedOrganizations: [],
        nonAccessedOrganizations: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [joiningOrgs, setJoiningOrgs] = useState<Set<string>>(new Set());

    // Configure axios defaults (you can move this to a separate axios config file)
    useEffect(() => {
        // Set default timeout
        axios.defaults.timeout = 10000;

        // Add request interceptor for authentication if needed
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                // Add auth token if available
                // const token = localStorage.getItem('authToken');
                // if (token) {
                //     config.headers.Authorization = `Bearer ${token}`;
                // }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Add response interceptor for global error handling
        const responseInterceptor = axios.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                // Handle global errors
                if (error.response?.status === 401) {
                    // Handle unauthorized - redirect to login
                    console.error("Unauthorized access");
                } else if ((error.response?.status ?? 0) >= 500) {
                    console.error("Server error");
                }
                return Promise.reject(error);
            }
        );

        // Cleanup interceptors on unmount
        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    // Fetch organizations data
    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                setError(null);
                const response = await axios.get<ApiResponse>(
                    "/api/v1/organization/fetch"
                );

                if (response.data.success) {
                    setOrganizations(response.data.data);
                } else {
                    setError("Failed to fetch organizations");
                }
            } catch (err) {
                handleApiError(err, "Failed to fetch organizations");
            } finally {
                setLoading(false);
            }
        };

        fetchOrganizations();
    }, []);

    // Handle API errors
    const handleApiError = (err: unknown, defaultMessage: string) => {
        if (axios.isAxiosError(err)) {
            const errorData = err.response?.data as ApiError;
            setError(errorData?.error || err.message || defaultMessage);
        } else {
            setError(defaultMessage);
        }
        console.error("API Error:", err);
    };

    // Handle accessing an organization
    const handleAccessOrganization = async (orgId: string, orgName: string) => {
        try {
            // Add org to joining state
            setJoiningOrgs((prev) => new Set(prev).add(orgId));

            const response = await axios.post(`/api/v1/organization/access`, {
                organizationId: orgId,
            });

            if (response.status === 200) {
                // Refresh the organizations data after successful access
                const updatedResponse = await axios.get<ApiResponse>(
                    "/api/v1/organization/fetch"
                );

                if (updatedResponse.data.success) {
                    setOrganizations(updatedResponse.data.data);
                    // You could add a success toast notification here
                    console.log(`Successfully joined ${orgName}`);
                }
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorData = err.response?.data as ApiError;
                const errorMessage =
                    errorData?.error || "Failed to join organization";
                console.error("Error joining organization:", errorMessage);
                // You could add an error toast notification here
                setError(errorMessage);
            } else {
                console.error("Unexpected error:", err);
                setError("An unexpected error occurred");
            }
        } finally {
            // Remove org from joining state
            setJoiningOrgs((prev) => {
                const newSet = new Set(prev);
                newSet.delete(orgId);
                return newSet;
            });
        }
    };

    // Retry fetching organizations
    const retryFetch = () => {
        setLoading(true);
        setError(null);
        // Trigger useEffect again
        const fetchOrganizations = async () => {
            try {
                const response =
                    await axios.get<ApiResponse>("/api/organizations");

                if (response.data.success) {
                    setOrganizations(response.data.data);
                } else {
                    setError("Failed to fetch organizations");
                }
            } catch (err) {
                handleApiError(err, "Failed to fetch organizations");
            } finally {
                setLoading(false);
            }
        };
        fetchOrganizations();
    };

    if (loading) {
        return (
            <div className="p-6 relative z-10">
                <div className="flex justify-center items-center h-64">
                    <div className="flex items-center space-x-3 text-white">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Loading organizations...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 relative z-10">
                <div className="flex flex-col justify-center items-center h-64 space-y-4">
                    <div className="text-red-400 text-center">
                        <p className="text-lg font-semibold mb-2">Error</p>
                        <p>{error}</p>
                    </div>
                    <button
                        onClick={retryFetch}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 relative z-10 space-y-8">
            {/* Accessed Organizations Section */}
            {organizations.accessedOrganizations.length > 0 && (
                <div>
                    <div className="flex items-center space-x-2 mb-6">
                        <Star className="w-6 h-6 text-yellow-400" />
                        <h2 className="text-2xl font-bold text-white">
                            Your Organizations
                        </h2>
                        <span className="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full text-sm">
                            {organizations.accessedOrganizations.length}
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {organizations.accessedOrganizations.map((org) => (
                            <div
                                key={org.id}
                                className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6 hover:border-yellow-400/50 transition-all group cursor-pointer"
                            >
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-yellow-400/20 flex items-center justify-center overflow-hidden">
                                        {org.image &&
                                        org.image !== "imageURL" ? (
                                            <img
                                                src={org.image}
                                                alt={org.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-2xl">🏢</div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors">
                                            {org.name}
                                        </h3>
                                        <p className="text-gray-400">
                                            {org.openIssues} open issues
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2 text-sm text-yellow-400">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span>Member</span>
                                    </div>
                                    <button className="text-yellow-400 hover:text-yellow-300 transition-colors">
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Discover Organizations Section */}
            <div>
                <div className="flex items-center space-x-2 mb-6">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                    <h2 className="text-2xl font-bold text-white">
                        {organizations.accessedOrganizations.length > 0
                            ? "Discover More"
                            : "Available Organizations"}
                    </h2>
                    <span className="bg-blue-400/20 text-blue-400 px-2 py-1 rounded-full text-sm">
                        {organizations.nonAccessedOrganizations.length}
                    </span>
                </div>

                {organizations.nonAccessedOrganizations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {organizations.nonAccessedOrganizations.map((org) => {
                            const isJoining = joiningOrgs.has(org.id);

                            return (
                                <div
                                    key={org.id}
                                    className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all group"
                                >
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-gray-700/50 flex items-center justify-center overflow-hidden">
                                            {org.image &&
                                            org.image !== "imageURL" ? (
                                                <img
                                                    src={org.image}
                                                    alt={org.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="text-2xl">
                                                    🏢
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                                                {org.name}
                                            </h3>
                                            <p className="text-gray-400">
                                                {org.openIssues} open issues
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                                            <TrendingUp className="w-4 h-4" />
                                            <span>Active community</span>
                                        </div>
                                        <button
                                            onClick={() =>
                                                handleAccessOrganization(
                                                    org.id,
                                                    org.name
                                                )
                                            }
                                            disabled={isJoining}
                                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all group-hover:scale-105 ${
                                                isJoining
                                                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                                    : "bg-blue-500 hover:bg-blue-600 text-white"
                                            }`}
                                        >
                                            {isJoining ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    <span>Joining...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Plus className="w-4 h-4" />
                                                    <span>Join</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🎉</div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            All caught up!
                        </h3>
                        <p className="text-gray-400">
                            You&apos;ve joined all available organizations.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
