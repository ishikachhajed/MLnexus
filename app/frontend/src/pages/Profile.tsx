import { useEffect, useMemo, useState } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { useNavigate, Link } from "react-router-dom";
import CustomToast from "../components/CustomToast";
import { useToastState } from "../hooks/useToastState";
import { api, getUser } from "../utils/api";

type ProfilePayload = {
    id: string;
    username: string;
    email: string;
    full_name: string;
    avatar_url: string | null;
    packages_count: number;
};

type CloudinarySignature = {
    cloudName: string;
    apiKey: string;
    timestamp: string;
    signature: string;
    folder: string;
};

export default function Profile() {
    const navigate = useNavigate();
    const { toast, showToast, setOpen } = useToastState();
    const user = useMemo(() => getUser(), []);

    const [profile, setProfile] = useState<ProfilePayload | null>(null);
    const [fullName, setFullName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        let isActive = true;
        const updateAvatarStorage = (url: string | null) => {
            if (url) {
                localStorage.setItem("mlnexus_avatar_url", url);
            } else {
                localStorage.removeItem("mlnexus_avatar_url");
            }
            window.dispatchEvent(new Event("avatar-updated"));
        };
        const loadProfile = async () => {
            try {
                const data = (await api("/auth/me")) as {
                    user: ProfilePayload;
                };
                if (!isActive) return;
                setProfile(data.user);
                setFullName(data.user.full_name || "");
                const url = data.user.avatar_url ?? null;
                setAvatarUrl(url);
                updateAvatarStorage(url);
            } catch (err) {
                if (!isActive) return;
                showToast({
                    title: "Failed to load profile",
                    message: err instanceof Error ? err.message : "Try again.",
                    variant: "error",
                });
            }
        };

        void loadProfile();
        return () => {
            isActive = false;
        };
    }, [navigate, showToast, user]);

    const handleAvatarChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            showToast({
                title: "Invalid file",
                message: "Please upload an image file.",
                variant: "error",
            });
            return;
        }

        try {
            setIsUploading(true);
            const signature = (await api(
                "/auth/cloudinary-signature",
            )) as CloudinarySignature;

            const formData = new FormData();
            formData.append("file", file);
            formData.append("api_key", signature.apiKey);
            formData.append("timestamp", signature.timestamp);
            formData.append("signature", signature.signature);
            formData.append("folder", signature.folder);

            const uploadRes = await fetch(
                `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                },
            );

            if (!uploadRes.ok) {
                throw new Error("Avatar upload failed");
            }

            const uploaded = (await uploadRes.json()) as {
                secure_url?: string;
            };
            if (!uploaded.secure_url) {
                throw new Error("Avatar upload failed");
            }

            setAvatarUrl(uploaded.secure_url);
            showToast({
                title: "Avatar uploaded",
                message: "Save your profile to apply changes.",
                variant: "success",
            });
        } catch (err) {
            showToast({
                title: "Upload failed",
                message: err instanceof Error ? err.message : "Upload failed",
                variant: "error",
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!fullName.trim()) {
            showToast({
                title: "Full name required",
                message: "Please enter your full name.",
                variant: "error",
            });
            return;
        }

        try {
            setIsSaving(true);
            const data = (await api("/auth/profile", {
                method: "PATCH",
                body: JSON.stringify({
                    full_name: fullName.trim(),
                    avatar_url: avatarUrl,
                }),
            })) as { user: ProfilePayload };
            setProfile(data.user);
            const url = data.user.avatar_url ?? null;
            if (url) {
                localStorage.setItem("mlnexus_avatar_url", url);
            } else {
                localStorage.removeItem("mlnexus_avatar_url");
            }
            window.dispatchEvent(new Event("avatar-updated"));
            showToast({
                title: "Profile updated",
                message: "Your profile was saved successfully.",
                variant: "success",
            });
            navigate("/explore");
        } catch (err) {
            showToast({
                title: "Update failed",
                message: err instanceof Error ? err.message : "Update failed",
                variant: "error",
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-4xl w-full mx-auto px-6 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-400">
                    Profile
                </h1>
                <p className="text-slate-400">
                    Update your avatar and personal details.
                </p>
            </div>

            <form
                onSubmit={handleSave}
                className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md p-6 shadow-[0_0_40px_rgba(236,72,153,0.05)]"
            >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar.Root className="h-20 w-20 overflow-hidden rounded-full border border-white/10 bg-black">
                            <Avatar.Image
                                src={avatarUrl ?? "/avatar.jpg"}
                                alt="Profile avatar"
                                className="h-full w-full object-cover"
                            />
                            <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-black text-lg font-semibold text-white/70">
                                {profile?.username?.slice(0, 1).toUpperCase() ??
                                    "U"}
                            </Avatar.Fallback>
                        </Avatar.Root>
                        <div>
                            <p className="text-lg font-bold text-white">
                                {profile?.username ?? "Account"}
                            </p>
                            <p className="text-sm font-medium text-pink-400">
                                {profile
                                    ? `${profile.packages_count} package${
                                          profile.packages_count === 1
                                              ? ""
                                              : "s"
                                      } uploaded`
                                    : "Loading packages..."}
                            </p>
                        </div>
                    </div>

                    <div>
                        <label className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer">
                            {isUploading ? "Uploading..." : "Upload photo"}
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarChange}
                                disabled={isUploading}
                            />
                        </label>
                        <p className="mt-2 text-xs text-slate-500 font-medium tracking-wide">
                            PNG or JPG, up to 5MB.
                        </p>
                    </div>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">
                            Full name
                        </label>
                        <input
                            value={fullName}
                            onChange={(event) =>
                                setFullName(event.target.value)
                            }
                            placeholder="Your full name"
                            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white placeholder:text-slate-600 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">
                            Email
                        </label>
                        <input
                            value={profile?.email ?? ""}
                            readOnly
                            className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-slate-400 cursor-not-allowed"
                        />
                    </div>
                </div>

                <div className="mt-8 rounded-xl border border-white/10 bg-black/40 p-5 text-sm text-slate-400 leading-relaxed">
                    To change your password, please click the{" "}
                    <Link
                        to="/forgot"
                        className="text-pink-400 hover:text-pink-300 font-medium transition-colors"
                    >
                        Forgot password
                    </Link>{" "}
                    option.
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
                    <Link
                        to="/explore"
                        className="text-sm font-semibold text-slate-400 hover:text-white transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="cursor-pointer rounded-xl bg-pink-600 px-8 py-3 text-sm font-bold tracking-wide text-white shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:bg-pink-500 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] disabled:opacity-60 transition-all"
                    >
                        {isSaving ? "Saving..." : "Save profile"}
                    </button>
                </div>
            </form>

            <CustomToast toast={toast} onOpenChange={setOpen} />
        </div>
    );
}
