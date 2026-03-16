/**
 * Unified Data Manager
 * Dynamically reads and manages all data from data files.
 * Adding new categories or cards to data files will automatically reflect in the app.
 */

(function() {
    'use strict';

    const DataManager = {
        dataLoaded: false,
        data: {
            webProjects: {},
            mobileProjects: {},
            iotProjects: {},
            skills: {}
        },

        // Wait for all data files to load and initialize
        init: function() {
            return new Promise((resolve) => {
                const checkData = () => {
                    if (typeof window.webProjectsData !== 'undefined' &&
                        typeof window.mobileProjectsData !== 'undefined' &&
                        typeof window.iotProjectsData !== 'undefined' &&
                        typeof window.skillsData !== 'undefined') {
                        this.dataLoaded = true;
                        this.data.webProjects = window.webProjectsData;
                        this.data.mobileProjects = window.mobileProjectsData;
                        this.data.iotProjects = window.iotProjectsData;
                        this.data.skills = window.skillsData;
                        console.log('📦 Data Manager initialized with dynamic categories');
                        resolve();
                    } else {
                        setTimeout(checkData, 100);
                    }
                };
                checkData();
            });
        },

        // Check if data is ready (for carousel fallback logic)
        isReady: function() {
            return typeof window.webProjectsData !== 'undefined' &&
                   typeof window.mobileProjectsData !== 'undefined' &&
                   typeof window.iotProjectsData !== 'undefined' &&
                   typeof window.skillsData !== 'undefined';
        },

        // Dynamically get all categories from a data object
        getCategories: function(dataObj) {
            return Object.keys(dataObj);
        },

        // Get all projects from all categories (flattened)
        getAllProjects: function(dataObj) {
            let all = [];
            Object.keys(dataObj).forEach(cat => {
                all = all.concat(dataObj[cat]);
            });
            return all;
        },

        // Get projects for a specific category
        getProjectsByCategory: function(dataObj, category) {
            return dataObj[category] || [];
        },

        // Get category count
        getCategoryCount: function(dataObj) {
            return Object.keys(dataObj).length;
        },

        // Get total project count
        getTotalProjectCount: function(dataObj) {
            let count = 0;
            Object.keys(dataObj).forEach(cat => {
                count += dataObj[cat].length;
            });
            return count;
        },

        // Format category key to display label (e.g., "frontend_apps" -> "Frontend Apps")
        formatCategoryLabel: function(categoryKey) {
            return categoryKey
                .replace(/_/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());
        },

        // Web Projects methods
        getWebCategories: function() {
            return this.getCategories(this.data.webProjects);
        },
        getAllWebProjects: function() {
            return this.getAllProjects(this.data.webProjects);
        },
        getWebProjectsByCategory: function(category) {
            return this.getProjectsByCategory(this.data.webProjects, category);
        },

        // Mobile Projects methods
        getMobileCategories: function() {
            return this.getCategories(this.data.mobileProjects);
        },
        getAllMobileProjects: function() {
            return this.getAllProjects(this.data.mobileProjects);
        },
        getMobileProjectsByCategory: function(category) {
            return this.getProjectsByCategory(this.data.mobileProjects, category);
        },

        // IoT Projects methods
        getIotCategories: function() {
            return this.getCategories(this.data.iotProjects);
        },
        getAllIotProjects: function() {
            return this.getAllProjects(this.data.iotProjects);
        },
        getIotProjectsByCategory: function(category) {
            return this.getProjectsByCategory(this.data.iotProjects, category);
        },

        // Skills methods
        getSkillsCategories: function() {
            return this.getCategories(this.data.skills);
        },
        getAllSkills: function() {
            return this.getAllProjects(this.data.skills);
        },
        getSkillsByCategory: function(category) {
            return this.getProjectsByCategory(this.data.skills, category);
        }
    };

    // Expose globally
    window.DataManager = DataManager;

})();
