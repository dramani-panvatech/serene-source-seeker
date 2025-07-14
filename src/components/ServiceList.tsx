import React, { useEffect, useState } from "react";
import { getServicesList } from "@/lib/serviceService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Edit, Share, MoreHorizontal, Clock, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CreateServiceDialog from "@/components/CreateServiceDialog";
import { useRef } from "react";

// Add handleEdit as an optional prop
type ServiceListProps = {
  viewMode: any;
  onCategoryCounts: any;
  onSuccess?: any;
  handleEdit?: (serviceId: any) => void;
  handleDelete?: (serviceId: any) => void;
};

const ServiceList = ({ viewMode, onCategoryCounts, onSuccess = undefined, handleEdit, handleDelete }: ServiceListProps) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // dialogRef and CreateServiceDialog removed

 

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getServicesList();
        setServices(data);
        // Set count for 'services' category as total length
        if (onCategoryCounts) {
          onCategoryCounts({ services: data.length });
        }
      } catch (err) {
        setError(err.message || "Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [onCategoryCounts]);

  if (loading) return <div>Loading services...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!services.length) return <div>No services found.</div>;

  return (
    <div className="mt-6">
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.serviceId} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{service.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="h-3 w-3" />
                        <span>{service.durationMinutes} min</span>
                        <span>•</span>
                        <span className="font-semibold text-green-600">{service.price} {service.currency}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit && handleEdit(service.serviceId)}>
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      <Users className="h-3 w-3 mr-1" />
                      {/* bookings not in API, so skip or add if available */}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {service.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm" onClick={() => handleEdit && handleEdit(service.serviceId)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete && handleDelete(service.serviceId)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <Card key={service.serviceId}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{service.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold">{service.name}</h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {service.durationMinutes} min
                        </span>
                        <span className="text-sm font-semibold text-green-600">{service.price} {service.currency}</span>
                        <Badge variant="secondary" className="text-xs">
                          {service.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit && handleEdit(service.serviceId)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete && handleDelete(service.serviceId)}>
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceList; 