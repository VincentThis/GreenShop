import { Header } from "@/components/Header";
import { CartFunctions } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address").max(255),
  message: z.string().min(1, "Message is required").max(1000),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = ({ cart }: { cart: CartFunctions }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactForm) => {
    console.log("Contact form:", data);
    toast.success("Message sent successfully! We'll get back to you soon.");
    reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cart={cart} />
      <div className="container py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
          <div>
            <p className="text-muted-foreground mb-8">
              Have a question or feedback? We'd love to hear from you. 
              Fill out the form and we'll get back to you as soon as possible.
            </p>

            <div className="space-y-6">
              <Card className="p-4 flex items-start gap-4">
                <Mail className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground">shopVerde143@gmail.com</p>
                </div>
              </Card>

              <Card className="p-4 flex items-start gap-4">
                <Phone className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Phone</h3>
                  <p className="text-muted-foreground">+63 915-804-3851</p>
                </div>
              </Card>

              <Card className="p-4 flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Address</h3>
                  <p className="text-muted-foreground">143 Punta Verde , Green Street<br />Angeles City, Pampanga</p>
                </div>
              </Card>
            </div>
          </div>

          <Card className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Name</label>
                <Input {...register("name")} placeholder="Your name" />
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                <Input {...register("email")} type="email" placeholder="your@email.com" />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Message</label>
                <Textarea {...register("message")} placeholder="Your message" rows={5} />
                {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
              </div>

              <Button type="submit" className="w-full" variant="hero">Send Message</Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
